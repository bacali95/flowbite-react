import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Drawer } from "./Drawer";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerItems } from "./DrawerItems";

describe.concurrent("Components / Drawer", () => {
  it("should hide/show Drawer when external toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<DrawerTest />);
    const toggleButton = screen.getAllByRole("button")[0];
    const drawer = screen.getByRole("dialog");

    expect(drawer).toHaveClass("-translate-x-full");

    await user.click(toggleButton);

    expect(drawer).toHaveClass("transform-none");

    await user.click(toggleButton);

    expect(drawer).toHaveClass("-translate-x-full");
  });
});

function DrawerTest() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!isOpen)}>Toggle</button>
      <Drawer onClose={() => setOpen(false)} open={isOpen}>
        <DrawerHeader title="Drawer" />
        <DrawerItems>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Supercharge your hiring by taking advantage of our&nbsp;
            <a href="#" className="text-cyan-600 underline hover:no-underline dark:text-cyan-500">
              limited-time sale
            </a>
            &nbsp;for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
            job board.
          </p>
        </DrawerItems>
      </Drawer>
    </>
  );
}
