import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { HiEye, HiHeart, HiInformationCircle } from "react-icons/hi";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import type { AlertProps } from "./Alert";
import { Alert } from "./Alert";

describe("Components / Alert", () => {
  describe("A11y", () => {
    it('should have `role="alert"`', () => {
      render(<TestAlert />);

      expect(alert()).toBeInTheDocument();
    });

    describe("Theme", () => {
      it("should use custom `base` classes", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            color: {
              info: "text-purple-100",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert />
          </ThemeProvider>,
        );

        expect(alert()).toHaveClass("text-purple-100");
      });

      it("should use custom `borderAccent` classes", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            borderAccent: "border-t-4 border-purple-500",
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert withBorderAccent />
          </ThemeProvider>,
        );

        expect(alert()).toHaveClass("border-t-4 border-purple-500");
      });

      it("should use custom `wrapper` classes", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            wrapper: "flex items-center",
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert />
          </ThemeProvider>,
        );

        expect(wrapper()).toHaveClass("flex items-center");
      });

      it("should use custom `color` classes", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            closeButton: {
              color: {
                info: "text-purple-500 hover:bg-purple-200 dark:text-purple-600 dark:hover:text-purple-300",
              },
            },
            color: {
              info: "text-purple-700 bg-purple-100 border-purple-500 dark:bg-purple-200 dark:text-purple-800",
            },
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert />
          </ThemeProvider>,
        );

        expect(alert()).toHaveClass(
          "text-purple-700 bg-purple-100 border-purple-500 dark:bg-purple-200 dark:text-purple-800",
        );
        expect(dismiss()).toHaveClass(
          "text-purple-500 hover:bg-purple-200 dark:text-purple-600 dark:hover:text-purple-300",
        );
      });

      it("should use custom `icon`", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            icon: "alert-custom-icon",
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert icon={HiHeart} />
          </ThemeProvider>,
        );

        expect(icon()).toHaveClass("alert-custom-icon");
      });

      it("should show custom `rounded` class", () => {
        const theme: CustomFlowbiteTheme = {
          alert: {
            rounded: "rounded",
          },
        };
        render(
          <ThemeProvider theme={theme}>
            <TestAlert />
          </ThemeProvider>,
        );

        expect(alert()).toHaveClass("rounded");
      });
    });
  });

  describe("Keyboard interactions", () => {
    it("should dismiss when `Tab` is pressed to navigate to Dismiss button and `Space` is pressed", async () => {
      const onDismiss = vi.fn();
      const user = userEvent.setup();
      render(<Alert onDismiss={onDismiss} />);

      await waitFor(async () => {
        await user.tab();

        expect(dismiss()).toHaveFocus();
      });

      await user.keyboard("[Space]");

      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe("Props", () => {
    it("should call `onDismiss` when clicked", async () => {
      const onDismiss = vi.fn();
      const user = userEvent.setup();
      render(<Alert onDismiss={onDismiss} />);

      await user.click(dismiss());

      expect(onDismiss).toHaveBeenCalled();
    });
  });
});

function TestAlert(props: AlertProps) {
  const [isDismissed, setDismissed] = useState(false);

  return (
    <Alert
      {...props}
      additionalContent={
        <>
          <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
            More info about this info alert goes here. This example text is going to run a bit longer so that you can
            see how spacing within an alert works with this kind of content.
          </div>
          <div className="flex">
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
            >
              <HiEye className="-ml-0.5 mr-2 size-4" />
              View more
            </button>
            <button
              type="button"
              className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </>
      }
      color="info"
      icon={HiInformationCircle}
      onDismiss={() => setDismissed(!isDismissed)}
      rounded
      withBorderAccent
    >
      {isDismissed ? "dismissed" : "waiting"}
    </Alert>
  );
}

const alert = () => screen.getByRole("alert");

const wrapper = () => screen.getByTestId("flowbite-alert-wrapper");

const icon = () => screen.getByTestId("flowbite-alert-icon");

const dismiss = () => screen.getByLabelText("Dismiss");
