import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme";
import type { CustomFlowbiteTheme } from "../../types";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import { buttonTheme } from "./theme";

describe("Components / Button group", () => {
  describe("A11y", () => {
    it('should have `role="group"` by default', () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>,
      );

      expect(group()).toBeInTheDocument();
    });

    it("should allow `aria-label`", () => {
      render(
        <ButtonGroup aria-label="My group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>,
      );
      expect(group()).toHaveAccessibleName("My group");
    });
  });

  describe("Keyboard interactions", () => {
    it("should trigger `onClick` when `Space` is pressed on a `Button`", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <ButtonGroup>
          <Button onClick={onClick}>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>,
      );

      const firstButton = buttons()[0];

      await user.tab();
      await user.click(firstButton);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should be possible to `Tab` out", async () => {
      const user = userEvent.setup();
      render(
        <>
          <ButtonGroup>
            <Button>Inside</Button>
          </ButtonGroup>
          <Button>Outside</Button>
        </>,
      );
      await user.tab();

      expect(buttons()[0]).toHaveFocus();

      await user.tab();

      expect(buttons()[1]).toHaveFocus();
    });
  });

  describe("Rendering", () => {
    it("should correctly set each `Button`'s position", () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>,
      );

      const groupedClasses = buttonTheme.grouped;

      expect(buttons()[0]).toHaveClass(groupedClasses);
      expect(buttons()[1]).toHaveClass(groupedClasses);
      expect(buttons()[2]).toHaveClass(groupedClasses);
    });
  });

  describe("Theme", () => {
    it("should use `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        buttonGroup: {
          base: "text-gray-400",
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </ThemeProvider>,
      );

      expect(group()).toHaveClass("text-gray-400");
    });

    it("should use `position` classes", () => {
      const theme: CustomFlowbiteTheme = {
        buttonGroup: {
          base: "text-gray-400",
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </ThemeProvider>,
      );

      expect(group()).toHaveClass("text-gray-400");
    });
  });
});

const group = () => screen.getByRole("group");

const buttons = () => screen.getAllByRole("button");
