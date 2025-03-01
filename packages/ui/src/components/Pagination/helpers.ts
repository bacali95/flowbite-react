/**
 * Generates an array of sequential numbers from a start value to an end value (inclusive).
 * @param start - The starting number of the range
 * @param end - The ending number of the range
 * @returns An array of numbers from start to end. Returns empty array if start is greater than or equal to end.
 * @example
 * ```ts
 * range(1, 5) // returns [1, 2, 3, 4, 5]
 * range(5, 1) // returns []
 * ```
 */
export function range(start: number, end: number): number[] {
  if (start >= end) {
    return [];
  }

  return [...Array(end - start + 1).keys()].map((key: number): number => key + start);
}
