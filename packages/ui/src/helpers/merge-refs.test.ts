import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "./merge-refs";

describe("mergeRefs", () => {
  it("should handle multiple mutable refs", () => {
    const ref1 = { current: null };
    const ref2 = { current: null };
    const value = "test";

    const mergedRef = mergeRefs([ref1, ref2]);
    // @ts-expect-error - bypass
    mergedRef(value);

    expect(ref1.current).toBe(value);
    expect(ref2.current).toBe(value);
  });

  it("should handle callback refs", () => {
    const callbackRef = vi.fn();
    const value = "test";

    const mergedRef = mergeRefs([callbackRef]);
    mergedRef(value);

    expect(callbackRef).toHaveBeenCalledWith(value);
  });

  it("should handle mixture of mutable and callback refs", () => {
    const mutableRef = { current: null };
    const callbackRef = vi.fn();
    const value = "test";

    const mergedRef = mergeRefs([mutableRef, callbackRef]);
    mergedRef(value);

    expect(mutableRef.current).toBe(value);
    expect(callbackRef).toHaveBeenCalledWith(value);
  });

  it("should handle null and undefined refs", () => {
    const ref1 = { current: null };
    const value = "test";

    const mergedRef = mergeRefs([ref1, null, undefined]);
    // @ts-expect-error - bypass
    mergedRef(value);

    expect(ref1.current).toBe(value);
  });
});
