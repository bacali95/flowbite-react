import { render, screen } from "@testing-library/react";
import { HiHome } from "react-icons/hi";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem } from "./BreadcrumbItem";

describe("Components / Breadcrumb", () => {
  it('should have `role="navigation"`', () => {
    render(<TestBreadcrumb />);

    expect(breadcrumb()).toBeInTheDocument();
  });

  it('should contain a `role="list"`', () => {
    render(<TestBreadcrumb />);

    expect(breadcrumb()).toContainElement(breadcrumbList());
  });

  it('should contain a `role="listitem"` for each `BreadcrumbItem`', () => {
    render(<TestBreadcrumb />);

    expect(items()[0]).toHaveTextContent("Home");
    expect(items()[1]).toHaveTextContent("Projects");
    expect(items()[2]).toHaveTextContent("Flowbite React");
  });

  it('should contain a `role="link"` for each `BreadcrumbItem href=".."`', () => {
    render(<TestBreadcrumb />);

    expect(links()[0]).toHaveTextContent("Home");
    expect(links()[1]).toHaveTextContent("Projects");
  });

  it("should use `aria-label` if provided", () => {
    render(<TestBreadcrumb />);

    expect(breadcrumb()).toHaveAccessibleName("test label");
  });

  it("should use custom list classes via theme={}", () => {
    const theme: CustomFlowbiteTheme = {
      breadcrumb: {
        root: {
          list: "gap-6",
        },
      },
    };
    render(
      <ThemeProvider theme={theme}>
        <TestBreadcrumb />
      </ThemeProvider>,
    );

    expect(breadcrumbList()).toHaveClass("gap-6");
  });

  it("should use custom item classes via theme={}", () => {
    const theme: CustomFlowbiteTheme = {
      breadcrumb: {
        item: {
          base: "justify-center",
          chevron: "h-9 w-9",
          href: {
            off: "text-md",
            on: "text-lg",
          },
          icon: "h-6 w-6",
        },
      },
    };
    render(
      <ThemeProvider theme={theme}>
        <TestBreadcrumb />
      </ThemeProvider>,
    );

    expect(items()[0]).toHaveClass("justify-center");
    expect(contents()[0]).toHaveAttribute("href");
    expect(contents()[0]).toHaveClass("text-lg");

    expect(items()[2]).toHaveClass("justify-center");
    expect(contents()[2]).not.toHaveAttribute("href");
    expect(contents()[2]).toHaveClass("text-md");
  });
});

function TestBreadcrumb() {
  return (
    <Breadcrumb aria-label="test label">
      <BreadcrumbItem href="#" icon={HiHome}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem icon={HiHome}>Flowbite React</BreadcrumbItem>
    </Breadcrumb>
  );
}

const breadcrumb = () => screen.getByRole("navigation");

const breadcrumbList = () => screen.getByRole("list");

const items = () => screen.getAllByRole("listitem");

const links = () => screen.getAllByRole("link");

const contents = () => screen.getAllByTestId("flowbite-breadcrumb-item");
