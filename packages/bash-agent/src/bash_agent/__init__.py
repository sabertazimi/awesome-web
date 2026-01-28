from anthropic import Anthropic
from anthropic.types import MessageParam, ToolParam, ToolResultBlockParam
from dotenv import load_dotenv
import os
import subprocess
import sys

load_dotenv()

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"), base_url=os.getenv("ANTHROPIC_BASE_URL")
)
TOOLS: list[ToolParam] = [
    {
        "name": "Bash",
        "description": """Execute shell command. Patterns:
- Read: cat/grep/find/ls
- Write: echo '...' > file
- Subagent: uv run bash-agent 'task description'""",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string"}},
            "required": ["command"],
        },
    }
]
SYSTEM = f"CLI agent at {os.getcwd()}. Use Bash. Spawn subagent for complex tasks."


def chat(prompt: str, history: list[MessageParam] | None = None) -> str:
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
                block.text for block in response.content if hasattr(block, "text")
            )

        results: list[ToolResultBlockParam] = []
        for block in response.content:
            if block.type == "tool_use":
                out = subprocess.run(
                    block.input["command"],
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


def main() -> None:
    if len(sys.argv) > 1:
        print(chat(sys.argv[1]))
    else:
        h: list[MessageParam] = []
        while (q := input("❯ ")) != ("/exit"):
            q and print(chat(q, h))
