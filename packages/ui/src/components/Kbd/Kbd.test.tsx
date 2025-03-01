import { render, screen } from "@testing-library/react";
import { MdKeyboardArrowLeft, MdKeyboardCommandKey } from "react-icons/md";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Kbd } from "./Kbd";

describe("Components / Kbd", () => {
  describe("Theme", () => {
    it("should use custom `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        kbd: {
          root: {
            base: "bg-yellow-400 dark:bg-yellow-40",
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Kbd />
        </ThemeProvider>,
      );

      expect(kbd()).toBeInTheDocument();
      expect(kbd()).toHaveClass("bg-yellow-400 dark:bg-yellow-40");
    });
  });

  describe("Rendering", () => {
    it("should render when `children={0}`", () => {
      render(<Kbd>0</Kbd>);
      expect(kbd()).toHaveTextContent("0");
    });

    it("should show icon when render", () => {
      render(<Kbd icon={MdKeyboardArrowLeft} />);

      expect(kbd()).toBeInTheDocument();
      expect(kbd().childNodes[0]).toContainHTML("svg");
    });

    it("should show icon and children when render", () => {
      render(<Kbd icon={MdKeyboardCommandKey}>command</Kbd>);

      expect(kbd()).toBeInTheDocument();
      expect(kbd().childNodes[0]).toContainHTML("svg");
      expect(kbd()).toHaveTextContent("command");
    });
  });
});

const kbd = () => screen.getByTestId("flowbite-kbd");
