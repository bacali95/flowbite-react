import { render, screen } from "@testing-library/react";
import { HiCheck } from "react-icons/hi";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Badge } from "./Badge";

describe("Components / Badge", () => {
  describe("Rendering", () => {
    it("should render", () => {
      render(<Badge icon={HiCheck}>A badge</Badge>);

      expect(badge()).toBeInTheDocument();
    });
  });

  describe("Classname", () => {
    it("should merge not overwrite", () => {
      render(<Badge className="bg-red-500">A badge with custom background</Badge>);

      expect(badge()).toHaveClass("bg-red-500");
    });
  });

  describe("Theme", () => {
    it("should use custom colors", () => {
      const theme: CustomFlowbiteTheme = {
        badge: {
          root: {
            color: {
              primary:
                "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Badge color="primary" icon={HiCheck}>
            A badge
          </Badge>
        </ThemeProvider>,
      );

      expect(badge()).toHaveClass(
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300",
      );
    });

    it("should use custom sizes", () => {
      const theme: CustomFlowbiteTheme = {
        badge: {
          root: {
            size: {
              xxl: "text-2xl",
            },
          },
          icon: {
            off: "rounded-lg p-1",
            on: "rounded-full p-5",
            size: {
              xxl: "w-6 h-6",
            },
          },
        },
      };
      render(
        <ThemeProvider theme={theme}>
          <Badge size="xxl">A badge</Badge>
          <Badge icon={HiCheck} size="xxl" />
        </ThemeProvider>,
      );

      const badges = screen.getAllByTestId("flowbite-badge");
      const regularBadge = badges[0];
      const emptyBadge = badges[1];

      expect(regularBadge).toHaveClass("text-2xl");
      expect(regularBadge).toHaveClass("rounded-lg p-1");
      expect(emptyBadge).toHaveClass("rounded-full p-5");
      expect(icon()).toHaveClass("w-6 h-6");
    });
  });
});

const badge = () => screen.getByTestId("flowbite-badge");

const icon = () => screen.getByTestId("flowbite-badge-icon");
