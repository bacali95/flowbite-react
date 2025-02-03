import { describe, expect, it } from "vitest";
import type { ThemingProps } from "../types";
import { withoutThemingProps } from "./without-theming-props";

describe("withoutThemingProps", () => {
  it("should remove theme, clearTheme and applyTheme props", () => {
    const props: ThemingProps<object> & { className: string; id: string } = {
      theme: {},
      clearTheme: true,
      applyTheme: {},
      className: "test",
      id: "test-id",
    };
    const result = withoutThemingProps(props);

    expect(result).toEqual({
      className: "test",
      id: "test-id",
    });
    // @ts-expect-error - testing for undefined
    expect(result.theme).toBeUndefined();
    // @ts-expect-error - testing for undefined
    expect(result.clearTheme).toBeUndefined();
    // @ts-expect-error - testing for undefined
    expect(result.applyTheme).toBeUndefined();
  });

  it("should return same object if no theming props present", () => {
    const props = {
      className: "test",
      id: "test-id",
    };
    const result = withoutThemingProps(props);

    expect(result).toEqual(props);
  });

  it("should handle empty object", () => {
    const props = {};
    const result = withoutThemingProps(props);

    expect(result).toEqual(props);
  });
});
