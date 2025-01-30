import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "./Navbar";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarCollapse } from "./NavbarCollapse";
import { NavbarLink } from "./NavbarLink";
import { NavbarToggle } from "./NavbarToggle";

describe("Navbar", () => {
  describe("A11y", () => {
    it('should have `role="navigation"`', () => {
      render(<NavbarTest />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should hide/show `NavbarMenu` when toggle is clicked", async () => {
      const user = userEvent.setup();
      render(<NavbarTest />);
      const collapse = screen.getByTestId("flowbite-navbar-collapse");
      const toggle = screen.getByTestId("flowbite-navbar-toggle");

      // Initially the menu should be hidden
      expect(collapse).toHaveClass("hidden");

      // Click the toggle to show the menu
      await user.click(toggle);

      // The menu should be visible
      expect(collapse).not.toHaveClass("hidden");

      // Click the toggle again to hide the menu
      await user.click(toggle);

      // The menu should be hidden again
      expect(collapse).toHaveClass("hidden");
    });
  });
});

function NavbarTest() {
  return (
    <Navbar>
      <NavbarBrand href="https://flowbite.com/">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/navbars" active>
          Home
        </NavbarLink>
        <NavbarLink href="/navbars">About</NavbarLink>
        <NavbarLink href="/navbars">Services</NavbarLink>
        <NavbarLink href="/navbars">Pricing</NavbarLink>
        <NavbarLink href="/navbars">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
