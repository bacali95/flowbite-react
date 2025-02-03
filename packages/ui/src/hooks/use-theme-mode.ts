"use client";

import { useEffect, useState } from "react";
import { isClient } from "../helpers/is-client";
import { useWatchLocalStorageValue } from "../hooks/use-watch-localstorage-value";
import { getMode, getPrefix } from "../store";

const DEFAULT_MODE: ThemeMode = "light";
const LS_THEME_MODE = "flowbite-theme-mode";
const SYNC_THEME_MODE = "flowbite-theme-mode-sync";

export type ThemeMode = "light" | "dark" | "auto";

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode(getMode()));

  /**
   * Persist `mode` in local storage and add/remove `dark` class on `html`
   */
  useEffect(() => {
    setModeInLS(mode);
    setModeInDOM(mode);
  }, []);

  /**
   * Sync all tabs with the latest theme mode value
   */
  useWatchLocalStorageValue({
    key: LS_THEME_MODE,
    onChange(newValue) {
      if (newValue) handleSetMode(newValue as ThemeMode);
    },
  });

  /**
   * Keep the other instances of the hook in sync (bi-directional)
   */
  useSyncMode((mode) => setMode(mode));

  /**
   * Sets `mode` to a given value: `light | dark` | `auto`
   */
  function handleSetMode(mode: ThemeMode) {
    setMode(mode);
    setModeInLS(mode);
    setModeInDOM(mode);
    document.dispatchEvent(new CustomEvent(SYNC_THEME_MODE, { detail: mode }));
  }

  /**
   * Toggles between: `light | dark`
   */
  function toggleMode() {
    let newMode = mode;

    if (newMode === "auto") newMode = computeModeValue(newMode);

    newMode = newMode === "dark" ? "light" : "dark";

    handleSetMode(newMode);
  }

  /**
   * Sets the value to `<Flowbite theme={{ mode }}>` prop
   */
  function clearMode() {
    const newMode = mode ?? DEFAULT_MODE;

    handleSetMode(newMode);
  }

  return { mode, computedMode: computeModeValue(mode), setMode: handleSetMode, toggleMode, clearMode };
}

/**
 * Custom event listener on `SYNC_THEME_MODE`
 */
function useSyncMode(onChange: (mode: ThemeMode) => void) {
  useEffect(() => {
    function handleSync(e: Event) {
      const mode = (e as CustomEvent<ThemeMode>).detail;

      onChange(mode);
    }

    document.addEventListener(SYNC_THEME_MODE, handleSync);
    return () => document.removeEventListener(SYNC_THEME_MODE, handleSync);
  }, []);
}

/**
 * Sets the give value in local storage
 */
function setModeInLS(mode: ThemeMode) {
  localStorage.setItem(LS_THEME_MODE, mode);
}

/**
 * Add or remove class `dark` on `html` element
 */
function setModeInDOM(mode: ThemeMode) {
  const prefix = getPrefix() ?? "";
  const computedMode = computeModeValue(mode);

  if (computedMode === "dark") {
    document.documentElement.classList.add(`${prefix}dark`);
  } else {
    document.documentElement.classList.remove(`${prefix}dark`);
  }
}

function getInitialMode(defaultMode?: ThemeMode): ThemeMode {
  if (!isClient()) return DEFAULT_MODE;

  const LSMode = localStorage.getItem(LS_THEME_MODE) as ThemeMode | undefined;

  return LSMode ?? defaultMode ?? DEFAULT_MODE;
}

/**
 * Parse `auto` mode value to either `light` or `dark`
 * @returns `light` | `dark`
 */
function computeModeValue(mode: ThemeMode): ThemeMode {
  return mode === "auto" ? prefersColorScheme() : mode;
}

/**
 * Get browser prefered color scheme
 * @returns `light` | `dark`
 */
function prefersColorScheme(): ThemeMode {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
