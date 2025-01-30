import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getPrefix } from "../store";
import { ThemeModeScript } from "./mode-script";

describe("ThemeModeScript", () => {
  it("should render with default props", () => {
    const { container } = render(<ThemeModeScript />);
    const script = container.querySelector("script");

    expect(script).toHaveAttribute("data-flowbite-theme-mode-script");
    expect(script?.innerHTML).toContain("flowbite-theme-mode");
    expect(script?.innerHTML).toContain("light");
  });

  it("should render with custom mode", () => {
    const { container } = render(<ThemeModeScript mode="dark" />);
    const script = container.querySelector("script");

    expect(script?.innerHTML).toContain('"dark"');
  });

  it("should render with custom defaultMode", () => {
    const { container } = render(<ThemeModeScript defaultMode="dark" />);
    const script = container.querySelector("script");

    expect(script?.innerHTML).toContain('"dark"');
  });

  it("should render with custom localStorageKey", () => {
    const { container } = render(<ThemeModeScript localStorageKey="custom-key" />);
    const script = container.querySelector("script");

    expect(script?.innerHTML).toContain("custom-key");
  });

  it("should include prefix from getPrefix()", () => {
    const prefix = getPrefix() ?? "";
    const { container } = render(<ThemeModeScript />);
    const script = container.querySelector("script");

    expect(script?.innerHTML).toContain(`"${prefix}dark"`);
  });
});
