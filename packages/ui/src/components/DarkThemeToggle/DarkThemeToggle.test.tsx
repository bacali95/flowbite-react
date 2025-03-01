import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import { DarkThemeToggle } from "./DarkThemeToggle";

describe("Dark theme toggle", () => {
  it("should toggle the theme when `Space` is pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <ThemeProvider>
        <DarkThemeToggle onClick={onClick} />
      </ThemeProvider>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
