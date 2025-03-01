import { deepmerge } from "deepmerge-ts";
import isEqual from "fast-deep-equal";
import { klona } from "klona/json";
import { useRef } from "react";
import { getPrefix } from "../store";
import type { ApplyTheme, DeepPartialApplyTheme, DeepPartialBoolean } from "../types";
import { applyPrefix } from "./apply-prefix";
import { applyPrefixV3 } from "./apply-prefix-v3";
import { convertUtilitiesToV4 } from "./convert-utilities-to-v4";
import { deepMergeStrings } from "./deep-merge";
import { getTailwindVersion } from "./get-tailwind-version";
import { twMerge } from "./tailwind-merge";

/**
 * Memoize wrapper around `resolveTheme` function.
 *
 * @param {...Parameters<typeof resolveTheme>} input - Arguments to pass to `resolveTheme` function
 * @returns {ReturnType<typeof resolveTheme>} The resolved theme configuration
 */
export function useResolveTheme<T>(...input: Parameters<typeof resolveTheme<T>>): ReturnType<typeof resolveTheme<T>> {
  return useStableMemo(() => resolveTheme(...input), input);
}

/**
 * A custom React hook that memoizes a value similar to `useMemo`, but with stable dependency comparison.
 * This hook ensures that the memoized value only updates when the dependencies have actually changed,
 * using deep equality comparison instead of reference equality.
 *
 * @template T - The type of the memoized value
 * @param {() => T} factory - A function that creates the value to be memoized
 * @param {unknown[]} dependencies - An array of dependencies that determine when the value should be recalculated
 * @returns {T} The memoized value that only changes when dependencies change (using deep equality)
 */
export function useStableMemo<T>(factory: () => T, dependencies: unknown[]): T {
  const prevDepsRef = useRef<unknown[]>();
  const prevResultRef = useRef<T>();

  const hasChanged = !prevDepsRef.current || !isEqual(prevDepsRef.current, dependencies);

  if (hasChanged) {
    prevDepsRef.current = dependencies;
    prevResultRef.current = factory();
  }

  return prevResultRef.current!;
}

/**
 * Adds prefix to `base` and merges with custom themes, applying optional `clearTheme` and `applyTheme` modifications.
 *
 * @template T - The type of the base theme.
 * @param {[base, ...custom[]]} themes - An array where the first element is the base theme and the rest are custom themes.
 * @param {DeepPartialBoolean<T>[]} clearThemeList - An array of `clearTheme` modifications to apply to the base theme.
 * @param {DeepPartialApplyTheme<T>[]} applyThemeList - An optional array of `applyTheme` modifications to apply to the merged theme.
 * @returns {T} - The resolved and merged theme.
 */
export function resolveTheme<T>(
  [base, ...custom]: [
    /** base theme */
    T,
    /** custom themes */
    ...unknown[],
  ],
  clearThemeList?: DeepPartialBoolean<T>[],
  applyThemeList?: DeepPartialApplyTheme<T>[],
): T {
  const prefix = getPrefix();
  const version = getTailwindVersion();

  const _custom = custom?.length ? custom?.filter((value) => value !== undefined) : undefined;
  const _clearThemeList = clearThemeList?.length ? clearThemeList?.filter((value) => value !== undefined) : undefined;
  const _applyThemeList = applyThemeList?.length ? applyThemeList?.filter((value) => value !== undefined) : undefined;

  const baseTheme = _clearThemeList?.length || version === 4 || prefix ? klona(base) : base;

  if (_clearThemeList?.length) {
    const finalClearTheme = cloneWithValue<T, boolean>(baseTheme, false);

    let run = false;

    for (const clearTheme of _clearThemeList) {
      if (clearTheme) {
        run = true;
      }

      patchClearTheme(finalClearTheme, clearTheme);
    }

    if (run) {
      runClearTheme(baseTheme, finalClearTheme as DeepPartialBoolean<T>);
    }
  }

  if (version === 4 || prefix) {
    stringIterator(baseTheme, (value) => {
      if (version === 4) {
        value = convertUtilitiesToV4(value);
      }
      if (prefix) {
        if (version === 3) {
          value = applyPrefixV3(value, prefix);
        }
        if (version === 4) {
          value = applyPrefix(value, prefix);
        }
      }

      return value;
    });
  }

  let theme = baseTheme;

  if (_custom?.length) {
    theme = deepMergeStrings(twMerge)(baseTheme, ..._custom) as T;
  }

  if (_applyThemeList?.length && _custom?.length) {
    const finalApplyTheme = cloneWithValue<T, ApplyTheme>(baseTheme, "merge");

    let run = false;

    for (const applyTheme of _applyThemeList) {
      if (applyTheme !== "merge") {
        run = true;
      }

      patchApplyTheme(finalApplyTheme, applyTheme);
    }

    if (run) {
      runApplyTheme(theme, deepmerge(baseTheme, ...custom) as T, finalApplyTheme as DeepPartialApplyTheme<T>);
    }
  }

  return theme;
}

function patchClearTheme<T>(base: T, clearTheme: DeepPartialBoolean<T>): void {
  function iterate(base: T, clearTheme: DeepPartialBoolean<T>) {
    if (typeof clearTheme === "boolean") {
      if (typeof base === "object" && base !== null) {
        for (const key in base) {
          // @ts-expect-error - bypass
          base[key] = iterate(base[key], clearTheme);
        }
      } else {
        return clearTheme;
      }
    }
    if (typeof clearTheme === "object" && clearTheme !== null) {
      for (const key in clearTheme) {
        // @ts-expect-error - bypass
        base[key] = iterate(base[key], clearTheme[key]);
      }
    }
    return base;
  }

  iterate(base, clearTheme);
}

function patchApplyTheme<T>(base: T, applyTheme: DeepPartialApplyTheme<T>): void {
  function iterate(base: T, applyTheme: DeepPartialApplyTheme<T>) {
    if (typeof applyTheme === "string") {
      if (typeof base === "object" && base !== null) {
        for (const key in base) {
          // @ts-expect-error - bypass
          base[key] = iterate(base[key], applyTheme);
        }
      } else {
        return applyTheme;
      }
    }
    if (typeof applyTheme === "object" && applyTheme !== null) {
      for (const key in applyTheme) {
        // @ts-expect-error - bypass
        base[key] = iterate(base[key], applyTheme[key]);
      }
    }
    return base;
  }

  iterate(base, applyTheme);
}

/**
 * Applies `clearTheme` modifications to a base object. If `clearTheme` is `true`,
 * it will recursively set all string properties of the base object to an empty string.
 * If `clearTheme` is an object, it will recursively apply the properties of the `clearTheme`
 * object to the base object.
 *
 * @template T - The type of the base object.
 * @param {T} base - The base object to which `clearTheme` modifications will be applied.
 * @param {DeepPartialBoolean<T>} `clearTheme` - The `clearTheme` modifications to apply. It can be a boolean or an object.
 * @returns {void}
 */
function runClearTheme<T>(base: T, clearTheme: DeepPartialBoolean<T>): void {
  function iterate(base: T, clearTheme: DeepPartialBoolean<T>) {
    if (clearTheme === true) {
      if (typeof base === "object" && base !== null) {
        for (const key in base) {
          // @ts-expect-error - bypass
          base[key] = iterate(base[key], clearTheme);
        }
      } else {
        return "";
      }
    }
    if (typeof clearTheme === "object" && clearTheme !== null) {
      for (const key in clearTheme) {
        // @ts-expect-error - bypass
        base[key] = iterate(base[key], clearTheme[key]);
      }
    }
    return base;
  }

  iterate(base, clearTheme);
}

/**
 * Patches and applies a theme by recursively merging or replacing values between base and target objects
 * based on the `applyTheme` configuration.
 *
 * @template T - The type of the theme object
 * @param {T} base - The base theme object to be modified
 * @param {T} target - The target theme object containing new values
 * @param {DeepPartialApplyTheme<T>} applyTheme - Configuration object that determines how the theme should be applied
 * @returns {void}
 */
function runApplyTheme<T>(base: T, target: T, applyTheme: DeepPartialApplyTheme<T>): void {
  function iterate(base: T, target: T, applyTheme: DeepPartialApplyTheme<T>) {
    if (applyTheme === "replace") {
      if (typeof base === "object" && base !== null) {
        for (const key in base) {
          // @ts-expect-error - bypass
          base[key] = iterate(base[key], target[key], applyTheme);
        }
      } else {
        return target;
      }
    }
    if (typeof applyTheme === "object" && applyTheme !== null) {
      for (const key in applyTheme) {
        // @ts-expect-error - bypass
        base[key] = iterate(base[key], target[key], applyTheme[key]);
      }
    }
    return base;
  }

  iterate(base, target, applyTheme);
}

/**
 * Iterates over a given input and applies a callback function to each string value found.
 * The input can be a string, an array, or an object containing strings.
 *
 * @template T - The type of the input.
 * @param {T} input - The input to iterate over. It can be a string, an array, or an object.
 * @param {(value: string) => string} callback - The callback function to apply to each string value.
 * @returns {void}
 */
function stringIterator<T>(input: T, callback: (value: string) => string): void {
  function iterate(input: T) {
    if (typeof input === "string") {
      return callback(input);
    } else if (Array.isArray(input)) {
      for (let i = 0; i < input.length; i++) {
        input[i] = iterate(input[i]);
      }
    } else if (typeof input === "object" && input !== null) {
      for (const key in input) {
        // @ts-expect-error - bypass
        input[key] = iterate(input[key]);
      }
    }
    return input;
  }

  iterate(input);
}

/**
 * Creates a deep clone of an object structure with all leaf values replaced by a specified value.
 *
 * @template T - The type of the input object
 * @template V - The type of the value to replace with
 * @param {T} input - The input object to clone
 * @param {V} value - The value to replace all leaf values with
 * @returns {T} A new object with the same structure as input but all leaf values replaced with the specified value
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const result = cloneWithValue(obj, 'new');
 * // result = { a: 'new', b: { c: 'new' } }
 */
function cloneWithValue<T, V>(input: T, value: V): T {
  if (input === null || typeof input !== "object") {
    return value as unknown as T;
  }

  const clone = {} as T;

  for (const key in input) {
    clone[key as keyof T] = cloneWithValue(input[key as keyof T], value);
  }

  return clone;
}
