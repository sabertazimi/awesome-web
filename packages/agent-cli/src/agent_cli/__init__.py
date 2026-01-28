import sys

from anthropic.types import MessageParam

from .agent import agent_loop


def main() -> None:
    if len(sys.argv) > 1:
        print(agent_loop(sys.argv[1]))
    else:
        h: list[MessageParam] = []
        while (q := input("❯ ")) != "/exit":
            q and print(agent_loop(q, h))
