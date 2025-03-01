import { describe, expect, it } from "vitest";
import { range } from "./helpers";

describe("Helpers / Range", () => {
  it("should return the empty list, given start >= end", () => {
    expect(range(20, 10)).toEqual([]);
    expect(range(10, 10)).toEqual([]);
  });

  it("should return every number from start to end, inclusive, given start < end", () => {
    expect(range(10, 20)).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it("should return correct ranges for different inputs", () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(0, 3)).toEqual([0, 1, 2, 3]);
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    expect(range(8, 9)).toEqual([8, 9]);
  });
});
