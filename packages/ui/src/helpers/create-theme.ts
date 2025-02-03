import type { CustomFlowbiteTheme } from "../types";

/**
 * Used to apply `tailwindcss` intellisense.
 * Creates a custom theme by accepting a theme object and returning it as is
 *
 * @template T - The type of the theme object, defaults to `CustomFlowbiteTheme`
 * @param {T} input - The theme object to be used
 * @returns {T} The provided theme object without modifications
 *
 * @example
 * ```ts
 * const myTheme = createTheme({
 *   button: {
 *     primary: 'bg-blue-500'
 *   }
 * });
 * ```
 */
export function createTheme<T = CustomFlowbiteTheme>(input: T): T {
  return input;
}
