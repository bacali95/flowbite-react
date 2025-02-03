/**
 * Merges multiple React refs into a single ref callback function.
 *
 * This utility function combines multiple refs (callback refs, mutable refs, etc.)
 * into a single callback ref that updates all provided refs.
 *
 * @param refs - An array of refs to be merged. Can contain:
 * - MutableRefObject
 * - LegacyRef
 * - undefined
 * - null
 *
 * @returns A RefCallback function that updates all provided refs with the current value
 *
 * @example
 * ```tsx
 * const firstRef = useRef(null);
 * const secondRef = useRef(null);
 *
 * <div ref={mergeRefs([firstRef, secondRef])} />
 * ```
 *
 * @typeParam T - The type of value the refs will reference
 */
export function mergeRefs<T>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        const _ref = ref as React.MutableRefObject<T | null>;
        _ref.current = value;
      }
    });
  };
}
