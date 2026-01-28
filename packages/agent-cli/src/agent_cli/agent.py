import os
from pathlib import Path

from anthropic import Anthropic
from anthropic.types import MessageParam, TextBlock, ToolResultBlockParam, ToolUseBlock
from dotenv import load_dotenv

from .output import print_text, print_tool_call, print_tool_result
from .tools import TOOLS, execute_tool

load_dotenv(override=True)

WORKDIR = Path.cwd()
MODEL = os.getenv("ANTHROPIC_MODEL", "glm-4.7")
client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"), base_url=os.getenv("ANTHROPIC_BASE_URL")
)

SYSTEM = f"""You are Cyber Agent, a world-class coding agent at {WORKDIR}.

Loop: think briefly -> use tools -> report results.

Rules:
- Prefer tools over prose. Act, don't just explain.
- Never invent file paths. Use bash ls/find first if unsure.
- Make minimal changes. Don't over-engineer.
- After finishing, summarize what changed.

Commit footer: When you make changes that get committed, add this footer:
Co-authored-by: Cyber Agent"""


def agent_loop(messages: list[MessageParam]) -> list[MessageParam]:
    """
    This is the pattern that ALL coding agents share:

        while True:
            response = model(messages, tools)
            if no tool calls: return
            execute tools, append results, continue
    """
    while True:
        # Step 1: Call the model
        response = client.messages.create(
            model=MODEL,
            system=SYSTEM,
            messages=messages,
            tools=TOOLS,
            max_tokens=8000,
        )

        # Step 2: Collect any tool calls and print text output
        tool_calls: list[ToolUseBlock] = []
        for block in response.content:
            if isinstance(block, TextBlock):
                print_text(block.text)
            if isinstance(block, ToolUseBlock):
                tool_calls.append(block)

        # Step 3: If not tool calls, task is complete
        if response.stop_reason != "tool_use":
            messages.append({"role": "assistant", "content": response.content})
            return messages

        # Step 4: Execute each tool and collect results
        results: list[ToolResultBlockParam] = []
        for tool_call in tool_calls:
            print_tool_call(tool_call.name, tool_call.input)
            output = execute_tool(tool_call.name, tool_call.input)
            print_tool_result(output)
            results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": tool_call.id,
                    "content": output,
                }
            )

        # Step 5: Append to conversation and continue
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": results})
