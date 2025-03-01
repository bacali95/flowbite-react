import { withoutThemingProps } from "./without-theming-props";

/**
 * Resolves and merges component props with provider props while removing theming-related properties
 *
 * @template T - The type of the component props
 * @param {T} props - The component props to resolve
 * @param {unknown} [providerProps] - Optional provider props to merge with component props
 * @returns {ReturnType<typeof withoutThemingProps<T>>} The merged props with theming properties removed
 */
export function resolveProps<T>(props: T, providerProps?: unknown): ReturnType<typeof withoutThemingProps<T>> {
  let mergedProps = withoutThemingProps(props);

  if (providerProps) {
    mergedProps = {
      ...providerProps,
      ...props,
    };
  }

  return mergedProps;
}
