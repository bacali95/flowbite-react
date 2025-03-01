import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { TextInput } from "../TextInput";
import { ToggleSwitch } from "./ToggleSwitch";

describe("Components / Toggle switch", () => {
  describe("A11y", () => {
    it('should have `role="switch"` by default', () => {
      render(<ToggleSwitch checked={false} label="Enable" onChange={console.log} />);

      expect(toggleSwitch()).toBeInTheDocument();
    });

    it("should have an accessible name", () => {
      render(<ToggleSwitch checked={false} label="Enable notifications" name="notifications" onChange={console.log} />);

      expect(toggleSwitch()).toHaveAccessibleName("Enable notifications");
    });
  });

  describe("Keyboard interaction", () => {
    it("shouldn't toggle when `Enter` is pressed", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ToggleSwitch checked={false} label="Enable notifications" name="notifications" onChange={handleChange} />,
      );

      await user.tab();

      expect(toggleSwitch()).toHaveFocus();

      await user.keyboard("[Enter]");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("shouldn't submit surrounding form when `Enter` is pressed", async () => {
      const handleSubmit = vi.fn();
      const user = userEvent.setup();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <ToggleSwitch checked={false} label="Enable notifications" name="notifications" onChange={console.log} />
        </form>,
      );

      await user.tab();

      expect(toggleSwitch()).toHaveFocus();

      await user.keyboard("[Enter]");

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("should toggle when `Space` is pressed", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      function TestToggleSwitch() {
        const [state, setState] = useState(false);

        return (
          <ToggleSwitch
            checked={state}
            label="Enable notifications"
            name="notifications"
            onChange={(value) => {
              setState(value);
              handleChange(value);
            }}
          />
        );
      }
      render(<TestToggleSwitch />);

      await user.tab();

      expect(toggleSwitch()).toHaveFocus();

      await user.keyboard("[Space]");

      expect(toggleSwitch()).toHaveAttribute("aria-checked", "true");

      await user.keyboard("[Space]");

      expect(toggleSwitch()).toHaveAttribute("aria-checked", "false");
    });

    it("should focus when `Tab` is pressed", async () => {
      const user = userEvent.setup();
      render(<ToggleSwitch checked={false} label="Enable notifications" name="notifications" onChange={console.log} />);

      await user.tab();

      expect(toggleSwitch()).toHaveFocus();
    });

    it("should allow the user to `Tab` away", async () => {
      const user = userEvent.setup();
      render(
        <form>
          <ToggleSwitch checked={false} label="Enable notifications" name="notifications" onChange={console.log} />
          <TextInput type="text" />
        </form>,
      );

      await user.tab();
      await user.tab();

      expect(toggleSwitch()).not.toHaveFocus();
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  describe("Props", () => {
    it("should allow HTML attributes for `<button>`s", () => {
      render(<ToggleSwitch checked={false} label="Enable" onChange={console.log} type="submit" />);

      expect(toggleSwitch()).toHaveAttribute("type", "submit");
    });
  });

  describe("Theme", () => {
    it("should use `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        toggleSwitch: {
          root: {
            base: "text-cyan-100",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <ToggleSwitch checked={false} label="Enable" onChange={console.log} type="submit" />
        </ThemeProvider>,
      );

      expect(toggleSwitch()).toHaveClass("text-cyan-100");
    });

    it("should use `active` classes", () => {
      const theme: CustomFlowbiteTheme = {
        toggleSwitch: {
          root: {
            active: {
              off: "text-cyan-200",
              on: "text-cyan-300",
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <ToggleSwitch checked={false} label="Enable" onChange={console.log} type="submit" />
          <ToggleSwitch disabled checked={false} label="Enable" onChange={console.log} type="submit" />
        </ThemeProvider>,
      );
      const activeToggleSwitch = toggleSwitches()[0];
      const disabledToggleSwitch = toggleSwitches()[1];

      expect(activeToggleSwitch).toHaveClass("text-cyan-300");
      expect(disabledToggleSwitch).toHaveClass("text-cyan-200");
    });

    it("should use `label` classes", () => {
      const theme: CustomFlowbiteTheme = {
        toggleSwitch: {
          root: {
            label: "test-label",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <ToggleSwitch checked={false} label="Enable" onChange={console.log} type="submit" />
        </ThemeProvider>,
      );

      expect(label()).toHaveClass("test-label");
    });

    it("should use `toggle` classes", () => {
      const theme: CustomFlowbiteTheme = {
        toggleSwitch: {
          toggle: {
            base: "h-6 w-11",
            checked: {
              color: {
                default: "bg-pink-700",
              },
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <ToggleSwitch checked label="Enable" onChange={console.log} type="submit" />
        </ThemeProvider>,
      );

      expect(toggle()).toHaveClass("h-6 w-11 bg-pink-700");
    });
  });
});

const toggleSwitch = () => screen.getByRole("switch");

const toggleSwitches = () => screen.getAllByRole("switch");

const label = () => screen.getByTestId("flowbite-toggleswitch-label");

const toggle = () => screen.getByTestId("flowbite-toggleswitch-toggle");
