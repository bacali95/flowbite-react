import { describe, expect, it } from "vitest";
import { applyPrefixV3 } from "./apply-prefix-v3";

describe("applyPrefix_v3", () => {
  it("should return empty string when classNames is empty", () => {
    expect(applyPrefixV3("", "tw-")).toBe("");
  });

  it("should return original classNames when prefix is empty", () => {
    expect(applyPrefixV3("text-lg", "")).toBe("text-lg");
  });

  it("should add prefix to single class", () => {
    expect(applyPrefixV3("text-lg", "tw-")).toBe("tw-text-lg");
  });

  it("should add prefix to multiple classes", () => {
    expect(applyPrefixV3("text-lg font-bold", "tw-")).toBe("tw-text-lg tw-font-bold");
  });

  it("should handle classes with modifiers", () => {
    expect(applyPrefixV3("dark:text-xl hover:text-lg", "tw-")).toBe("dark:tw-text-xl hover:tw-text-lg");
  });

  it("should preserve ! modifier", () => {
    expect(applyPrefixV3("!text-lg", "tw-")).toBe("!tw-text-lg");
  });

  it("should preserve - modifier", () => {
    expect(applyPrefixV3("-mt-2", "tw-")).toBe("-tw-mt-2");
  });

  it("should preserve ! and - modifiers", () => {
    expect(applyPrefixV3("!-mt-2", "tw-")).toBe("!-tw-mt-2");
  });

  it("should handle arbitrary values", () => {
    expect(applyPrefixV3("[&>*]:gap-4", "tw-")).toBe("[&>*]:tw-gap-4");
  });

  it("should handle custom separator", () => {
    expect(applyPrefixV3("dark__text-xl", "tw-", "__")).toBe("dark__tw-text-xl");
  });

  it("should not add prefix if class already has it", () => {
    expect(applyPrefixV3("tw-text-lg", "tw-")).toBe("tw-text-lg");
  });

  it("should handle extra whitespace", () => {
    expect(applyPrefixV3("  text-lg   font-bold  ", "tw-")).toBe("tw-text-lg tw-font-bold");
  });

  it("should handle extra whitespace in prefix", () => {
    expect(applyPrefixV3("text-lg", "  tw-  ")).toBe("tw-text-lg");
  });

  it("should handle multiple modifiers", () => {
    expect(applyPrefixV3("dark:hover:!text-lg", "tw-")).toBe("dark:hover:!tw-text-lg");
  });
});
