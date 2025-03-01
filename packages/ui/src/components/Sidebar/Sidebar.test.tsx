import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HiChartPie, HiInbox, HiShoppingBag } from "react-icons/hi";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import type { SidebarProps } from "./Sidebar";
import { Sidebar } from "./Sidebar";
import { SidebarCollapse } from "./SidebarCollapse";
import { SidebarCTA } from "./SidebarCTA";
import { SidebarItem } from "./SidebarItem";
import { SidebarItemGroup } from "./SidebarItemGroup";
import { SidebarItems } from "./SidebarItems";
import { SidebarLogo } from "./SidebarLogo";

describe("Components / Sidebar", () => {
  describe("A11y", () => {
    it("should use `aria-label` if provided", () => {
      render(<TestSidebar aria-label="My differently labelled sidebar" />);

      const sidebar = screen.getByLabelText("My differently labelled sidebar");

      expect(sidebar).toHaveAccessibleName("My differently labelled sidebar");
    });

    it("should use text content as accessible name in `SidebarCollapse` and `SidebarItem`", async () => {
      const user = userEvent.setup();
      const itemLabels = ["Dashboard", "E-commerce", "Products", "Services", "Inbox", "My heading"];

      render(<TestSidebar />);

      for (const collapse of collapseButtons()) {
        await user.click(collapse);
      }

      items().forEach((item, i) => {
        expect(item.firstElementChild).toHaveAccessibleName(itemLabels[i]);
      });
    });

    it("should use text content as accessible name in `SidebarLogo`", () => {
      render(<TestSidebar />);

      expect(logo()).toHaveAccessibleName("Flowbite");
    });

    it('should use `imgAlt` as alternative text for image in `SidebarLogo` given `img=".." and imgAlt=".."`', () => {
      render(<TestSidebar />);

      const logoImg = screen.getByAltText("Flowbite logo");

      expect(logoImg).toHaveAccessibleName("Flowbite logo");
    });
  });
});

describe("Keyboard interactions", () => {
  it("should expand/collapse when `Space` is pressed on a `SidebarCollapse`", async () => {
    const user = userEvent.setup();
    render(<TestSidebar />);

    const collapseButton = collapseButtons()[0];

    await user.click(collapseButton);

    const collapse = collapses()[0];

    expect(collapse).toBeVisible();
  });

  it('should follow link when `Space` is pressed on `SidebarItem` with `href=".."`', () => {
    render(<TestSidebar />);

    const link = screen.getAllByRole("link")[1];

    expect(link).toHaveAccessibleName("Dashboard");
    expect(link).toHaveAttribute("href", "#");
  });

  it("should be possible to `Tab` out", async () => {
    const user = userEvent.setup();
    render(
      <>
        <TestSidebar />
        <button role="checkbox">Outside</button>
      </>,
    );

    const outside = screen.getByText("Outside");

    await waitFor(async () => {
      await user.tab();

      expect(outside).toHaveFocus();
    });
  });
});

describe("Props", () => {
  it('shouldn\'t display anything when `collapseBehavior="hide"`', () => {
    render(<TestSidebar collapseBehavior="hide" collapsed />);

    const sidebar = screen.queryByLabelText("Sidebar");

    expect(sidebar).not.toBeVisible();
  });

  it("shouldn't display `SidebarCTA` when `collapsed={true}`", () => {
    render(<TestSidebar collapsed />);

    expect(cta()).not.toBeVisible();
  });

  it("shouldn't display text content in `SidebarLogo` when `collapsed={true}`", () => {
    render(<TestSidebar collapsed />);

    expect(logo().lastElementChild).toHaveClass("hidden");
  });

  it('should use the HTML element provided in `SidebarItem as=".."`', () => {
    render(<TestSidebar />);

    const asItem = screen.getByLabelText("My heading");

    expect(asItem.tagName.toLocaleLowerCase()).toEqual("h3");
  });
});

describe("Theme", () => {
  it("should use custom classes", () => {
    const theme: CustomFlowbiteTheme = {
      sidebar: {
        root: {
          base: "bg-gray-100",
          collapsed: {
            off: "text-gray-200",
            on: "text-gray-300",
          },
          inner: "bg-gray-200",
        },
      },
    };

    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <TestSidebar aria-label="not-collapsed" />
        <TestSidebar aria-label="collapsed" collapsed />
      </ThemeProvider>,
    );
    const sidebar = getByLabelText("not-collapsed");
    const inner = sidebar.firstElementChild;
    const collapsedSidebar = getByLabelText("collapsed");

    expect(sidebar).toHaveClass("bg-gray-100");
    expect(sidebar).toHaveClass("text-gray-200");
    expect(inner).toHaveClass("bg-gray-200");
    expect(collapsedSidebar).toHaveClass("text-gray-300");
  });

  describe("`SidebarCollapse`", () => {
    it("should use custom classes", async () => {
      const user = userEvent.setup();
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          collapse: {
            button: "text-gray-100",
            icon: {
              base: "text-gray-200",
              open: {
                off: "bg-gray-100",
                on: "bg-gray-200",
              },
            },
            label: {
              base: "text-gray-300",
              icon: {
                base: "text-gray-400",
                open: {
                  on: "",
                  off: "",
                },
              },
            },
            list: "bg-gray-300",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar />
        </ThemeProvider>,
      );
      const labelIcons = collapseLabels().map((label) => label.nextElementSibling);

      collapseButtons().forEach((button) => expect(button).toHaveClass("text-gray-100"));
      collapseIcons().forEach((icon) => expect(icon).toHaveClass("text-gray-200 bg-gray-100"));
      collapseLabels().forEach((label) => expect(label).toHaveClass("text-gray-300"));
      labelIcons.forEach((labelicon) => expect(labelicon).toHaveClass("text-gray-400"));

      for (const button of collapseButtons()) {
        await user.click(button);
      }

      collapseIcons().forEach((icon) => expect(icon).toHaveClass("bg-gray-200"));
    });
  });

  describe("`SidebarCTA`", () => {
    it("should use custom classes", () => {
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          cta: {
            base: "bg-gray-100",
            color: {
              primary: "text-gray-100",
            },
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar />
        </ThemeProvider>,
      );

      expect(cta()).toHaveClass("bg-gray-100 text-gray-100");
    });
  });

  describe("`SidebarItem`", () => {
    it("should use custom classes", () => {
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          item: {
            active: "text-gray-100",
            base: "bg-gray-100",
            collapsed: {
              insideCollapse: "text-gray-300",
            },
            content: {
              base: "bg-gray-200",
            },
            icon: {
              base: "size-6",
              active: "bg-gray-300",
            },
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar collapsed />
        </ThemeProvider>,
      );
      const theItems = items()
        .map((item) => item.firstElementChild)
        .map((item) => item?.firstElementChild)
        .filter((item) => item?.tagName.toLocaleLowerCase() !== "button") as HTMLElement[];
      const activeItems = screen.getAllByTestId("active-item");
      const activeIcons = activeItems.map((item) => item.firstElementChild);
      const inactiveIcons = [...collapseIcons().filter((icon) => !activeIcons.includes(icon))];
      const inactiveItems = [...theItems.filter((item) => item !== null && !activeItems.includes(item))];

      activeIcons.forEach((icon) => expect(icon).toHaveClass("bg-gray-300"));
      activeItems.forEach((item) => expect(item).toHaveClass("text-gray-100"));
      itemContents().forEach((content) => expect(content).toHaveClass("bg-gray-200"));
      inactiveIcons.forEach((icon) => expect(icon).not.toHaveClass("bg-gray-300"));
      inactiveItems.forEach((item) => expect(item).not.toHaveClass("text-gray-100"));
      icons().forEach((icon) => expect(icon).toHaveClass("size-6"));
      theItems.forEach((item) => expect(item).toHaveClass("bg-gray-100"));
    });
  });

  describe("`SidebarItems`", () => {
    it("should use custom classes", () => {
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          items: {
            base: "text-gray-100",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar />
        </ThemeProvider>,
      );

      itemsContainers().forEach((container) => expect(container).toHaveClass("text-gray-100"));
    });
  });

  describe("`SidebarItemGroup`", () => {
    it("should use custom classes", () => {
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          itemGroup: {
            base: "text-gray-100",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar />
        </ThemeProvider>,
      );
      itemGroups().forEach((group) => expect(group).toHaveClass("text-gray-100"));
    });
  });

  describe("`SidebarLogo`", () => {
    it("should use custom classes", () => {
      const theme: CustomFlowbiteTheme = {
        sidebar: {
          logo: {
            base: "text-gray-100",
            collapsed: {
              off: "text-gray-300",
              on: "text-gray-400",
            },
            img: "text-gray-200",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestSidebar />
        </ThemeProvider>,
      );
      expect(logo()).toHaveClass("text-gray-100");
    });
  });
});

const TestSidebar = (props: SidebarProps) => (
  <Sidebar {...props}>
    <SidebarLogo href="#" img="favicon.svg" imgAlt="Flowbite logo">
      Flowbite
    </SidebarLogo>
    <SidebarItems>
      <SidebarItemGroup>
        <SidebarItem active data-testid="active-item" href="#" icon={HiChartPie} label="3" labelColor="success">
          Dashboard
        </SidebarItem>
        <SidebarCollapse aria-label="E-commerce" icon={HiShoppingBag}>
          <SidebarItem href="#">Products</SidebarItem>
          <SidebarItem href="#">Services</SidebarItem>
        </SidebarCollapse>
        <SidebarItem href="#" icon={HiInbox}>
          Inbox
        </SidebarItem>
        <SidebarItem as="h3">My heading</SidebarItem>
      </SidebarItemGroup>
    </SidebarItems>
    <SidebarCTA color="primary">Some content</SidebarCTA>
  </Sidebar>
);

const collapseButtons = () => screen.getAllByRole("button");

const collapses = () => screen.getAllByRole("list").slice(1);

const collapseIcons = () => screen.getAllByTestId("flowbite-sidebar-collapse-icon");

const collapseLabels = () => screen.getAllByTestId("flowbite-sidebar-collapse-label");

const cta = () => screen.getByText("Some content");

const itemContents = () => screen.getAllByTestId("flowbite-sidebar-item-content");

const itemGroups = () => screen.getAllByTestId("flowbite-sidebar-item-group");

const icons = () => screen.getAllByTestId("flowbite-sidebar-item-icon");

const items = () => screen.getAllByRole("listitem");

const itemsContainers = () => screen.getAllByTestId("flowbite-sidebar-items");

const logo = () => screen.getByLabelText("Flowbite");
