import { describe, expect, it } from "vitest";
import { applyPrefix } from "./apply-prefix";

describe("applyPrefix", () => {
  it("should return empty string when classNames is empty", () => {
    expect(applyPrefix("", "tw")).toBe("");
  });

  it("should return original classNames when prefix is empty", () => {
    expect(applyPrefix("text-lg", "")).toBe("text-lg");
  });

  it("should add prefix to single class", () => {
    expect(applyPrefix("text-lg", "tw")).toBe("tw:text-lg");
  });

  it("should add prefix to multiple classes", () => {
    expect(applyPrefix("text-lg font-bold", "tw")).toBe("tw:text-lg tw:font-bold");
  });

  it("should not add prefix if class already has it", () => {
    expect(applyPrefix("tw:text-lg", "tw")).toBe("tw:text-lg");
  });

  it("should handle extra whitespace", () => {
    expect(applyPrefix("  text-lg   font-bold  ", "tw")).toBe("tw:text-lg tw:font-bold");
  });

  it("should handle extra whitespace in prefix", () => {
    expect(applyPrefix("text-lg", "  tw  ")).toBe("tw:text-lg");
  });

  it("should handle arbitrary values", () => {
    expect(applyPrefix("[&>*]:space-y-6", "tw")).toBe("tw:[&>*]:space-y-6");
  });

  it("should handle multiple arbitrary values", () => {
    expect(applyPrefix("[&>*]:space-y-6 [mask-type:luminance]", "tw")).toBe(
      "tw:[&>*]:space-y-6 tw:[mask-type:luminance]",
    );
  });

  it("should handle arbitrary variants with slashes", () => {
    expect(applyPrefix("lg:p-4 sm/group-hover:p-8", "tw")).toBe("tw:lg:p-4 tw:sm/group-hover:p-8");
  });

  it("should handle data attributes", () => {
    expect(applyPrefix("data-[size=lg]:p-8", "tw")).toBe("tw:data-[size=lg]:p-8");
  });

  it("should handle multiple modifiers", () => {
    expect(applyPrefix("hover:dark:focus:text-white", "tw")).toBe("tw:hover:dark:focus:text-white");
  });
});
