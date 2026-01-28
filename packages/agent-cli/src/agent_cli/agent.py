import os
import subprocess
from pathlib import Path
from typing import TypedDict, cast

from anthropic import Anthropic
from anthropic.types import MessageParam, TextBlock, ToolParam, ToolResultBlockParam
from dotenv import load_dotenv


class BashToolInput(TypedDict):
    command: str


load_dotenv(override=True)

WORKDIR = Path.cwd()
MODEL = os.getenv("ANTHROPIC_MODEL", "glm-4.7")
client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"), base_url=os.getenv("ANTHROPIC_BASE_URL")
)

SYSTEM = f"""You are a world-class coding agent at {WORKDIR}.

Loop: think briefly -> use tools -> report results.

Rules:
- Prefer tools over prose. Act, don't just explain.
- Never invent file paths. Use bash ls/find first if unsure.
- Make minimal changes. Don't over-engineer.
- After finishing, summarize what changed."""

TOOLS: list[ToolParam] = [
    {
        "name": "Bash",
        "description": """Execute shell command. Patterns:
- Read: cat/grep/find/ls
- Write: echo '...' > file
- Subagent: uv run agent-cli 'task description'""",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string"}},
            "required": ["command"],
        },
    }
]


def agent_loop(prompt: str, history: list[MessageParam] | None = None) -> str:
    if history is None:
        history = []
    history.append({"role": "user", "content": prompt})

    while True:
        response = client.messages.create(
            model="glm-4.7",
            system=SYSTEM,
            messages=history,
            tools=TOOLS,
            max_tokens=8000,
        )
        history.append({"role": "assistant", "content": response.content})

        if response.stop_reason != "tool_use":
            return "".join(
                block.text for block in response.content if isinstance(block, TextBlock)
            )

        results: list[ToolResultBlockParam] = []
        for block in response.content:
            if block.type == "tool_use":
                command = cast(BashToolInput, block.input)["command"]
                out = subprocess.run(
                    command,
                    shell=True,
                    capture_output=True,
                    text=True,
                    timeout=300,
                )
                results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": out.stdout + out.stderr,
                    }
                )

        history.append({"role": "user", "content": results})
