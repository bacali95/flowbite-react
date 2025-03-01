import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import type { DropdownProps } from "./Dropdown";
import { Dropdown } from "./Dropdown";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropdownItem";

const delay = async (delayTime: number) => await new Promise((r) => setTimeout(r, delayTime));

describe("Components / Dropdown", () => {
  describe("A11y", () => {
    it('should use `role="menu"` in menu container', async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));

      expect(screen.getByRole("menu")).toBe(dropdown());
    });

    it('should use `role="menuitem"` in dropdown items', async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));

      expect(screen.getAllByRole("menuitem")).toHaveLength(4);
    });

    it("should not open when `disabled={true}`", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<TestDropdown disabled />);

      expect(button()).toBeDisabled();

      await act(() => user.click(button()));
      expect(dropdown()).not.toBeInTheDocument();

      rerender(<TestDropdown disabled trigger="hover" />);

      await act(() => user.hover(button()));
      expect(dropdown()).not.toBeInTheDocument();
    });
  });

  describe("Keyboard interactions", () => {
    it("should collapse if expanded when `Space` is pressed", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);
      expect(dropdown()).not.toBeInTheDocument();

      await act(() => user.click(button()));

      expect(dropdown()).toBeInTheDocument();
    });

    it("should expand if collapsed when `Space` is pressed", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));
      await act(() => user.click(button()));

      expect(dropdown()).not.toBeInTheDocument();
    });

    it("should expand when focus button and press arrow down key", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.tab());
      expect(button()).toHaveFocus();
      expect(dropdown()).not.toBeInTheDocument();

      await act(() => fireEvent.keyDown(button(), { key: "ArrowDown", code: "ArrowDown" }));
      expect(dropdown()).toBeInTheDocument();
    });

    it("should focus matching item when user types the first option char and dropdown is open", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));
      expect(dropdown()).toBeInTheDocument();

      await act(() => fireEvent.keyDown(button(), { key: "S", code: "KeyS" }));
      await delay(20);

      const item = screen.getByText("Settings");
      expect(item).toHaveFocus();
    });
  });

  describe("Mouse interactions", () => {
    it("should collapse if item is clicked", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));
      await act(() => userEvent.click(dropdownItem()));

      expect(dropdown()).not.toBeInTheDocument();
    });

    it("should collapse if CustomTriggerItem is clicked", async () => {
      const user = userEvent.setup();
      render(<TestDropdown renderTrigger={() => <button type="button"></button>} />);

      await act(() => user.click(screen.getByRole("button")));
      await act(() => userEvent.click(dropdownItem()));

      expect(dropdown()).not.toBeInTheDocument();
    });

    it("should always collapse when item is clicked", async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await act(() => user.click(button()));
      await act(() => userEvent.click(dropdownItem()));

      expect(dropdown()).not.toBeInTheDocument();

      await act(() => user.click(button()));
      await act(() => userEvent.click(dropdownItem()));

      expect(dropdown()).not.toBeInTheDocument();
    });

    it("should not collapse in case item is clicked if dismissOnClick = false", async () => {
      const user = userEvent.setup();
      render(<TestDropdown dismissOnClick={false} />);

      expect(dropdown()).not.toBeInTheDocument();

      await act(() => user.click(button()));

      expect(dropdown()).toBeInTheDocument();

      await act(() => userEvent.click(dropdownItem()));

      expect(dropdown()).toBeInTheDocument();
    });

    it('should open on hover when `trigger="hover"`', async () => {
      const user = userEvent.setup();
      render(<TestDropdown trigger="hover" />);

      expect(dropdown()).not.toBeInTheDocument();

      await act(() => user.hover(button()));

      expect(dropdown()).toBeInTheDocument();
    });
  });

  describe("Type of button", () => {
    it("should be of type `button`", async () => {
      render(<TestDropdown />);
      expect(button()).toHaveAttribute("type", "button");
    });

    it("should be of type `button` with inline", async () => {
      render(<TestDropdown inline />);
      expect(button()).toHaveAttribute("type", "button");
    });
  });

  describe("Dropdown item render", () => {
    it("should override DropdownItem base component when using `as` prop", async () => {
      const user = userEvent.setup();

      const CustomBaseItem = ({ children }: PropsWithChildren) => {
        return <a href="#">{children}</a>;
      };

      render(
        <Dropdown label="Dropdown button" placement="right">
          <DropdownItem as={CustomBaseItem}>Settings</DropdownItem>
        </Dropdown>,
      );

      await act(() => user.click(button()));

      const item = screen.getByText("Settings");
      expect(screen.getByRole("link")).toBe(item);
    });
  });
});

const TestDropdown = ({
  dismissOnClick = true,
  inline = false,
  disabled,
  trigger,
  renderTrigger,
}: Partial<DropdownProps>) => (
  <Dropdown
    label="Dropdown button"
    placement="right"
    dismissOnClick={dismissOnClick}
    inline={inline}
    trigger={trigger}
    disabled={disabled}
    renderTrigger={renderTrigger}
  >
    <DropdownHeader>
      <span className="block text-sm">Bonnie Green</span>
      <span className="block truncate text-sm font-medium">name@flowbite.com</span>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
);

const button = () => screen.getByRole("button", { name: /Dropdown button/i });

const dropdown = () => screen.queryByTestId("flowbite-dropdown");

const dropdownItem = () => screen.getByText("Dashboard");
