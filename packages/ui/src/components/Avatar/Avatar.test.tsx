import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Avatar } from "./Avatar";

describe("Components / Avatar", () => {
  describe("Theme", () => {
    it("should use custom sizes", () => {
      const theme: CustomFlowbiteTheme = {
        avatar: {
          root: {
            size: {
              xxl: "h-64 w-64",
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Avatar size="xxl" />
        </ThemeProvider>,
      );

      expect(img()).toHaveClass("h-64 w-64");
    });

    it("should use custom colors", () => {
      const theme: CustomFlowbiteTheme = {
        avatar: {
          root: {
            color: {
              rose: "ring-rose-500 dark:ring-rose-400",
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Avatar
            bordered
            color="rose"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Your avatar"
          />
        </ThemeProvider>,
      );

      expect(img()).toHaveClass("ring-rose-500 dark:ring-rose-400");
    });
  });
  describe("Placeholder", () => {
    it("should display placeholder initials", () => {
      render(
        <ThemeProvider>
          <Avatar placeholderInitials="RR" />
        </ThemeProvider>,
      );

      expect(initialsPlaceholderText()).toHaveTextContent("RR");
    });

    it("should support explicit sizes with placeholder initials", () => {
      render(
        <ThemeProvider>
          <Avatar placeholderInitials="RR" size="xl" />
        </ThemeProvider>,
      );

      expect(initialsPlaceholder()).toHaveClass("h-36 w-36");
    });
    it("should support border color with placeholder initials", () => {
      render(
        <ThemeProvider>
          <Avatar placeholderInitials="RR" bordered color="success" />
        </ThemeProvider>,
      );

      expect(initialsPlaceholder()).toHaveClass("ring-green-500 dark:ring-green-500");
    });
  });
  describe("Image", () => {
    it("should support custom image elements", () => {
      render(
        <ThemeProvider>
          <Avatar img={(props) => <img alt="" referrerPolicy="no-referrer" {...props} />} />
        </ThemeProvider>,
      );

      expect(img()).toHaveAttribute("referrerpolicy", "no-referrer");
    });
  });
  describe("Status", () => {
    it("should have online status indicator", () => {
      render(
        <ThemeProvider>
          <Avatar status="online" />
        </ThemeProvider>,
      );

      expect(status()).toHaveClass("bg-green-400");
    });
  });
});

const status = () => screen.getByTestId("flowbite-avatar-status");
const img = () => screen.getByTestId("flowbite-avatar-img");
const initialsPlaceholder = () => screen.getByTestId("flowbite-avatar-initials-placeholder");
const initialsPlaceholderText = () => screen.getByTestId("flowbite-avatar-initials-placeholder-text");
