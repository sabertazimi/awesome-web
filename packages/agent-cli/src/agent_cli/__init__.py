from pathlib import Path

from anthropic.types import MessageParam

from .agent import agent_loop

WORKDIR = Path.cwd()


def main() -> None:
    print(f"Minimal Claude Code - {WORKDIR}")
    print("Type '/exit' to quit.\n")

    history: list[MessageParam] = []

    while True:
        try:
            user_input = input("❯ ").strip()
        except (EOFError, KeyboardInterrupt):
            break

        if not user_input or user_input.lower() == "/exit":
            break

        history.append({"role": "user", "content": user_input})

        try:
            agent_loop(history)
        except Exception as e:
            print(f"Error: {e}")

        print()
