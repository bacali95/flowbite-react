import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider, useThemeProvider } from "./provider";

describe("ThemeProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should merge theme with parent theme when not root", () => {
    const parentTheme = { button: { base: "parent" } };
    const childTheme = { button: { base: "child" } };

    const { result } = renderHook(() => useThemeProvider(), {
      wrapper: ({ children }) => (
        <ThemeProvider theme={parentTheme}>
          <ThemeProvider theme={childTheme}>{children}</ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(result.current.theme).toEqual({
      button: { base: "parent child" },
    });
  });

  it("should not merge with parent theme when root is true", () => {
    const parentTheme = { button: { base: "parent" } };
    const childTheme = { button: { base: "child" } };

    const { result } = renderHook(() => useThemeProvider(), {
      wrapper: ({ children }) => (
        <ThemeProvider theme={parentTheme}>
          <ThemeProvider theme={childTheme} root>
            {children}
          </ThemeProvider>
        </ThemeProvider>
      ),
    });

    expect(result.current.theme).toEqual(childTheme);
  });

  it("should return empty object when used outside provider", () => {
    const { result } = renderHook(() => useThemeProvider());
    expect(result.current).toEqual({});
  });
});
