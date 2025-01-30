import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";
import { ToastToggle } from "./ToastToggle";

describe("Components / Toast", () => {
  beforeAll(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("should remove `Toast` from DOM after give `duration` when `ToastToggle` is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Toast duration={200}>
        <ToastToggle onClick={handleClick} />
      </Toast>,
    );

    await user.click(toggle());
    expect(toast()?.className).toContain("opacity-0");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(toast()).not.toBeInTheDocument();
  });

  it("should convert `Toast` to stateless when `onDismiss` is given to `ToastToggle`", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleDismiss = vi.fn();

    render(
      <Toast>
        <ToastToggle onDismiss={handleDismiss} onClick={handleClick} />
      </Toast>,
    );

    await user.click(toggle());
    expect(toast()?.className).not.toContain("opacity-0");

    expect(handleClick).toHaveBeenCalled();
    expect(handleDismiss).toHaveBeenCalled();

    act(() => {
      vi.runAllTimers();
    });

    expect(toast()).toBeInTheDocument();
  });

  describe("A11y", () => {
    it("should have `role=alert`", async () => {
      render(
        <Toast>
          <ToastToggle />
        </Toast>,
      );
      expect(toast()).toBeInTheDocument();
    });
  });

  describe("Keyboard interactions", () => {
    it("should close `Toast` when `Space` is pressed on `ToastToggle`", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Toast>
          <ToastToggle onClick={handleClick} />
        </Toast>,
      );

      await user.tab();
      await user.keyboard("[Space]");

      expect(toast()?.className).toContain("opacity-0");
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

const toast = () => screen.queryByRole("alert");
const toggle = () => screen.getByRole("button");
