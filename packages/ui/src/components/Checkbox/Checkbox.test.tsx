import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Checkbox } from "./Checkbox";

describe("Components / Checkbox", () => {
  describe("A11y", () => {
    it('should have role="checkbox" by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Theme", () => {
    it("should use custom `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        checkbox: {
          base: "bg-yellow-400 dark:bg-yellow-40",
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Checkbox />
        </ThemeProvider>,
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("bg-yellow-400 dark:bg-yellow-40");
    });
  });
});
