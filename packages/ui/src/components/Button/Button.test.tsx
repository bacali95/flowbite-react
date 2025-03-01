import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Button } from "./Button";

describe("Components / Button", () => {
  describe("A11y", () => {
    it('should have `role="button"` by default', () => {
      render(<Button>Hi there</Button>);

      expect(button()).toBeInTheDocument();
    });

    it("should be able to use any other role permitted for `<button>`s", () => {
      render(<Button role="menuitem">Hi there</Button>);

      const button = screen.getByRole("menuitem");

      expect(button).toBeInTheDocument();
    });
  });

  describe("Keyboard interactions", () => {
    it("should trigger `onClick` when `Space` is pressed", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Hi there</Button>);

      await user.click(button());

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should focus when `Tab` is pressed", async () => {
      const user = userEvent.setup();
      render(<Button>Hi there</Button>);

      await user.tab();

      expect(button()).toHaveFocus();
    });

    it("should be possible to `Tab` out", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Button>Hi there</Button>
          <Button>Hello there</Button>
          <button type="submit">Submit</button>
        </>,
      );

      await user.tab();

      expect(buttons()[0]).toHaveFocus();

      await user.tab();

      expect(buttons()[1]).toHaveFocus();

      await user.tab();

      expect(buttons()[2]).toHaveFocus();
    });
  });

  describe("Props", () => {
    it("should allow HTML attributes for `<button>`s", () => {
      render(
        <Button formAction="post.php" type="submit">
          Hi there
        </Button>,
      );

      expect(button()).toHaveAttribute("formAction", "post.php");
      expect(button()).toHaveAttribute("type", "submit");
    });

    it("should be disabled when `disabled={true}`", () => {
      render(<Button disabled>Hi there</Button>);

      expect(button()).toBeDisabled();
    });
  });

  describe("Rendering", () => {
    it("should render when `children={0}`", () => {
      render(<Button>0</Button>);

      expect(button()).toHaveTextContent("0");
    });

    describe("`as` and `href` props", () => {
      it('should render an anchor `<a>` when `href=".."`', () => {
        render(<Button href="#" />);

        expect(buttonLink()).toBeInTheDocument();
      });

      it("should render component defined in `as`", () => {
        const CustomComponent = ({ children }: PropsWithChildren<{ uniqueProp: boolean }>) => {
          return <li>{children}</li>;
        };

        render(
          <ul>
            <Button as={CustomComponent} uniqueProp>
              Something or other
            </Button>
          </ul>,
        );

        const button = buttonListItem();

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Something or other");
      });

      it("should render component defined in `as` prop even though `href` is defined", () => {
        const CustomComponent = ({ children }: PropsWithChildren) => {
          return <li>{children}</li>;
        };

        render(
          <ul>
            <Button href="#" as={CustomComponent} />
          </ul>,
        );

        expect(buttonListItem()).toBeInTheDocument();
      });

      it("should render tag element defined in `as`", () => {
        render(
          <ul>
            <Button as="li" />
          </ul>,
        );

        expect(buttonListItem()).toBeInTheDocument();
      });

      it("should render as button `as={null}`", () => {
        render(
          <ul>
            <Button as={null} />
          </ul>,
        );

        expect(button()).toBeInTheDocument();
      });
    });
  });

  describe("Theme", () => {
    it("should use `base` classes", () => {
      const theme: CustomFlowbiteTheme = {
        button: {
          base: "font-extralight",
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <Button />
        </ThemeProvider>,
      );

      expect(button()).toHaveClass("font-extralight");
    });

    it("should use `color` classes", () => {
      const theme: CustomFlowbiteTheme = {
        button: {
          color: {
            primary: "bg-red-300",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <Button color="primary" />
        </ThemeProvider>,
      );

      expect(button()).toHaveClass("bg-red-300");
    });

    it("should use `disabled` classes", () => {
      const theme: CustomFlowbiteTheme = {
        button: {
          disabled: "opacity-10",
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <Button disabled />
        </ThemeProvider>,
      );

      expect(button()).toHaveClass("opacity-10");
    });

    it("should use `size` classes", () => {
      const theme: CustomFlowbiteTheme = {
        button: {
          size: {
            xxl: "font-extrabold",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <Button size="xxl">Hello</Button>
        </ThemeProvider>,
      );

      const button = screen.getByText("Hello");

      expect(button).toHaveClass("font-extrabold");
    });
  });
});

const button = () => screen.getByRole("button");

const buttonLink = () => screen.getByRole("link");

const buttonListItem = () => screen.getByRole("listitem");

const buttons = () => screen.getAllByRole("button");
