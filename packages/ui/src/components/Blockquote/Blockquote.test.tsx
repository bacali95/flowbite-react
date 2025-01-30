import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Blockquote } from "./Blockquote";

describe("Components / Blockquote", () => {
  describe("Theme", () => {
    it("should use custom `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        blockquote: {
          root: {
            base: "bg-yellow-400 dark:bg-yellow-40",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Blockquote />
        </ThemeProvider>,
      );
      expect(blockquote()).toBeInTheDocument();
      expect(blockquote()).toHaveClass("bg-yellow-400 dark:bg-yellow-40");
    });
  });
  describe("Rendering", () => {
    it("should render when `children={0}`", () => {
      render(<Blockquote>0</Blockquote>);
      expect(blockquote()).toHaveTextContent("0");
    });
  });
});

const blockquote = () => screen.getByTestId("flowbite-blockquote");
