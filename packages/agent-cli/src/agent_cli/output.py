# ANSI escape codes
GREEN = "\033[32m"
GRAY = "\033[90m"
RESET = "\033[0m"


def print_text(text: str) -> None:
    """Print model text output with bullet prefix."""
    # Align subsequent lines with the "● " prefix (2 chars)
    aligned = text.replace("\n", "\n  ")
    print(f"\n● {aligned}")


def print_tool_call(name: str, tool_input: dict[str, object]) -> None:
    """Print tool call: ToolName(key_arg)."""
    match name:
        case "Bash":
            detail = str(tool_input.get("command", ""))
        case "Read":
            detail = str(tool_input.get("path", ""))
        case "Write":
            detail = str(tool_input.get("path", ""))
        case "Edit":
            detail = str(tool_input.get("path", ""))
        case _:
            detail = str(tool_input)
    print(f"\n{GREEN}●{RESET} {name}({detail})")


def print_tool_result(output: str, max_length: int = 200) -> None:
    """Print tool result preview in dim gray."""
    preview = output[:max_length] + "..." if len(output) > max_length else output
    # Align subsequent lines with the "  ⎿  " prefix (5 chars)
    preview = preview.replace("\n", "\n     ")
    print(f"  ⎿  {GRAY}{preview}{RESET}")
