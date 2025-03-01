import { describe, expect, it } from "vitest";
import { get } from "./get";

describe("get helper", () => {
  const testObject = {
    a: {
      b: {
        c: "value",
      },
      d: [1, 2, 3],
    },
    e: "top level",
  };

  it("should get nested value with dot notation", () => {
    expect(get(testObject, "a.b.c")).toBe("value");
  });

  it("should get array value with dot notation", () => {
    expect(get(testObject, "a.d")).toEqual([1, 2, 3]);
  });

  it("should get top level value", () => {
    expect(get(testObject, "e")).toBe("top level");
  });

  it("should handle empty path", () => {
    expect(get(testObject, "")).toBeUndefined();
  });

  it("should handle non-object input", () => {
    expect(get("string", "length")).toBe("string");
    expect(get(null, "any")).toBeUndefined();
    expect(get(undefined, "any")).toBeUndefined();
  });

  it("should handle true at root level", () => {
    const clearTheme = true;
    expect(get(clearTheme, "base")).toBe(true);
    expect(get(clearTheme, "icon")).toBe(true);
    expect(get(clearTheme, "icon.base")).toBe(true);
  });

  it("should handle partial object overrides", () => {
    const clearTheme = { icon: true };
    expect(get(clearTheme, "base")).toBeUndefined();
    expect(get(clearTheme, "icon")).toBe(true);
    expect(get(clearTheme, "icon.base")).toBe(true);
  });

  it("should handle nested partial object overrides", () => {
    const clearTheme = { icon: { base: true } };
    expect(get(clearTheme, "icon")).toEqual({ base: true });
    expect(get(clearTheme, "icon.base")).toBe(true);
    expect(get(clearTheme, "icon.size")).toBeUndefined();
  });

  it("should handle invalid paths", () => {
    const clearTheme = { icon: { base: true } };
    expect(get(clearTheme, "invalid")).toBeUndefined();
    expect(get(clearTheme, "icon.invalid")).toBeUndefined();
  });
});
