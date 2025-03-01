/**
 * Safely retrieves a value from a nested object using a dot-notated path string
 *
 * @template T - The type of the input object
 * @param {T} input - The input object to traverse
 * @param {string} path - A dot-notated string path (e.g. "user.address.street")
 * @returns {any} The value at the specified path, or undefined if the path is invalid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T>(input: T, path: string): any {
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = input;

  for (const key of keys) {
    if (typeof result === "boolean" || typeof result === "string") {
      return result;
    }
    if (result == null || typeof result !== "object") {
      return undefined;
    }
    result = result[key];
  }

  return result;
}
