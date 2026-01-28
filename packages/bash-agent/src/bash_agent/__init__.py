import sys

from anthropic.types import MessageParam

from .agent import chat


def main() -> None:
    if len(sys.argv) > 1:
        print(chat(sys.argv[1]))
    else:
        h: list[MessageParam] = []
        while (q := input("❯ ")) != "/exit":
            q and print(chat(q, h))
