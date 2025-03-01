import { beforeEach, describe, expect, it } from "vitest";
import { setStore } from "../store";
import { resolveTheme } from "./resolve-theme";

describe("resolveTheme", () => {
  beforeEach(() => {
    setStore({ prefix: "" });
  });

  it("should merge base theme with custom themes", () => {
    const base = { color: "text-red-400" };
    const custom = { background: "text-blue-400" };

    expect(resolveTheme([base, custom], [])).toEqual({
      color: "text-red-400",
      background: "text-blue-400",
    });
  });

  it("should apply prefix with version 3 format", () => {
    setStore({ prefix: "tw-" });

    const base = { color: "text-red-400" };

    expect(resolveTheme([base], [])).toEqual({
      color: "tw-text-red-400",
    });
  });

  it("should clear theme values when clearTheme is true", () => {
    const base = { color: "text-red-400", nested: { background: "text-blue-400" } };
    const clearTheme = [{ color: true, nested: { background: true } }];

    expect(resolveTheme([base], clearTheme)).toEqual({
      color: "",
      nested: { background: "" },
    });
  });

  it("should apply theme modifications", () => {
    const base = { color: "flex text-red-100" };
    const custom = { color: "grid" };
    const applyTheme = [{ color: "replace" }];

    // @ts-expect-error - complex inference
    expect(resolveTheme([base, custom], [], applyTheme)).toEqual({
      color: "grid",
    });
  });

  it("should handle deep nested objects", () => {
    const base = {
      colors: {
        primary: { light: "text-blue-100", dark: "text-blue-800" },
        secondary: { light: "text-red-400", dark: "text-red-800" },
      },
    };
    const custom = {
      colors: {
        primary: { light: "text-cyan-100" },
      },
    };

    expect(resolveTheme([base, custom], [])).toEqual({
      colors: {
        primary: { light: "text-cyan-100", dark: "text-blue-800" },
        secondary: { light: "text-red-400", dark: "text-red-800" },
      },
    });
  });
});
