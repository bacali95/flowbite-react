import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarGroupCounter } from "./AvatarGroupCounter";

describe("AvatarGroupCounter", () => {
  it("renders the counter element with the correct classname", () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<AvatarGroupCounter total={3} href="test" className="test-class" />);
    const counterElement = screen.getByText("+3");
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveClass("test-class");
    expect(counterElement).toHaveAttribute("href", "test");
  });

  it("merges the custom theme with the default theme", () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<AvatarGroupCounter total={5} theme={{ base: "custom-base-class" }} />);
    const counterElement = screen.getByText("+5");
    expect(counterElement).toHaveClass("custom-base-class");
  });
});
