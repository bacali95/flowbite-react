import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Radio } from "./Radio";

describe("Components / Radio", () => {
  describe("A11y", () => {
    it('should have role="radio" by default', () => {
      render(<Radio />);
      const radio = screen.getByRole("radio");

      expect(radio).toBeInTheDocument();
    });
  });

  describe("Theme", () => {
    it("should use custom `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        radio: {
          base: "bg-yellow-400 dark:bg-yellow-40",
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Radio />
        </ThemeProvider>,
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("bg-yellow-400 dark:bg-yellow-40");
    });
  });
});
