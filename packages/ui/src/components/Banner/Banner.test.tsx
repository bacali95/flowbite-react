import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Banner } from "./Banner";
import { BannerCollapseButton } from "./BannerCollapseButton";

describe("Components / Banner", () => {
  it("should close when collapse button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Banner>
          <BannerCollapseButton>Click me</BannerCollapseButton>
        </Banner>
      </div>,
    );

    await user.tab();
    await user.keyboard("[Space]");

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });
});
