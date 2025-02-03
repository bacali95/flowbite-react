import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { Popover } from "./Popover";

describe("Popover", () => {
  describe("Rendering", () => {
    it("should display when target is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Popover content="Default">
          <Button>Target</Button>
        </Popover>,
      );
      expect(popover()).not.toBeInTheDocument();

      await user.click(target());
      expect(popover()).toBeInTheDocument();
    });

    it('should display on hover when `trigger="hover"`', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger="hover" content="Default">
          <Button>Target</Button>
        </Popover>,
      );

      expect(popover()).not.toBeInTheDocument();

      await user.hover(target());
      expect(popover()).toBeInTheDocument();
    });

    it("should hide arrow when `arrow={false}`", async () => {
      const user = userEvent.setup();
      render(
        <Popover content="Default" arrow={false}>
          <Button>Target</Button>
        </Popover>,
      );

      await user.click(target());
      expect(popover()).toBeInTheDocument();
      expect(arrow()).not.toBeInTheDocument();
    });

    it("should programmatically open/close", async () => {
      const user = userEvent.setup();
      render(<ControlledPopover />);

      expect(popover()).not.toBeInTheDocument();

      await user.click(target());
      expect(popover()).toBeInTheDocument();

      await user.click(closePopoverButton());
      expect(popover()).not.toBeInTheDocument();
    });
  });

  describe("A11y", () => {
    it('should have `role="dialog"`', async () => {
      const user = userEvent.setup();

      render(
        <Popover content="Default">
          <Button>Target</Button>
        </Popover>,
      );

      await user.click(target());
      expect(popover()).toHaveAttribute("role", "dialog");
    });
  });
});

function ControlledPopover() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover
        content={<Button onClick={() => setOpen(false)}>Close popover</Button>}
        open={open}
        onOpenChange={setOpen}
      >
        <Button onClick={() => setOpen(true)}>Target</Button>
      </Popover>
    </>
  );
}

const arrow = () => screen.queryByTestId("flowbite-popover-arrow");
const target = () => screen.getByText("Target").closest("button") as HTMLButtonElement;
const popover = () => screen.queryByRole("dialog");
const closePopoverButton = () => screen.getByText("Close popover").closest("button") as HTMLButtonElement;
