import type { WithoutThemingProps } from "../types";

/**
 * Removes theming properties (theme, clearTheme, applyTheme)
 *
 * @template T - The type of the object
 * @param {T} props - The object to remove theming properties from
 * @returns {WithoutThemingProps<T>} The object without theming properties (theme, clearTheme, applyTheme)
 */
export function withoutThemingProps<T>(props: T): WithoutThemingProps<T> {
  // @ts-expect-error - bypass
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, clearTheme, applyTheme, ...rest } = props;

  return rest;
}
