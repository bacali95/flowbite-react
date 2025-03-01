import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  describe("Keyboard interactions", () => {
    // TODO: fix
    it.todo("should display when target is focused with `Tab`", async () => {
      const user = userEvent.setup();
      render(<TooltipTests />);

      await user.tab();

      const tooltip = tooltips()[0];

      expect(tooltip).not.toHaveClass("invisible");
    });

    it("should display when `Space` is pressed while target is focused", async () => {
      const user = userEvent.setup();
      render(<TooltipTests />);

      const target = targets()[1];
      const tooltip = tooltips()[1];

      await user.click(target);

      expect(tooltip).not.toHaveClass("invisible");
    });
  });

  describe("Rendering", () => {
    it("should invert placement so it stays on screen if it would normally be placed off screen", async () => {
      const user = userEvent.setup();
      render(<TooltipTests />);

      let tooltip = tooltips()[2];
      let arrow = arrows()[2];

      await user.click(tooltip);
      expect(arrow).toHaveStyle("top: -4px");

      tooltip = tooltips()[3];
      arrow = arrows()[3];

      await user.click(tooltip);

      expect(arrow).toHaveStyle("left: -4px");
    });
  });
});

const TooltipTests = (): JSX.Element => {
  return (
    <div>
      <Tooltip content="Tooltip content">
        <Button>Default tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button>Click tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="bottom" trigger="click">
        <Button>Bottom placed tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="right" trigger="click">
        <Button>Right placed tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="auto" trigger="click">
        <Button>Auto placed tooltip</Button>
      </Tooltip>
    </div>
  );
};

const arrows = () => screen.getAllByTestId("flowbite-tooltip-arrow");

const targets = () => screen.getAllByTestId("flowbite-tooltip-target");

const tooltips = () => screen.getAllByTestId("flowbite-tooltip");
