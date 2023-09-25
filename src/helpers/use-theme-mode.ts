'use client';

import { useEffect, useState } from 'react';
import { isClient } from './is-client';
import { useWatchLSValue } from './use-watch-LS-value';

const LS_THEME_MODE = 'flowbite-theme-mode';
const SYNC_EVENT = 'flowbite-theme-mode-sync';

// TODO: add `system` as well
export type Mode = 'light' | 'dark';

export const useThemeMode = () => {
  const [mode, setMode] = useState<Mode>(getInitialMode());

  /**
   * Sync all tabs with the latest theme mode value
   */
  useWatchLSValue({
    key: LS_THEME_MODE,
    onChange(newValue) {
      if (newValue) handleSetMode(newValue as Mode);
    },
  });

  /**
   * Keep the other instances of the hook in sync (bi-directional)
   */
  useEffect(() => {
    function handleSync(e: Event) {
      const mode = (e as CustomEvent<Mode>).detail;
      setMode(mode);
    }

    document.addEventListener(SYNC_EVENT, handleSync);
    return () => document.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  useEffect(() => {
    setModeInLS(mode);
    setModeOnBody(mode);
  }, []);

  /**
   * Toggles  between `light | dark`
   */
  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';

    handleSetMode(newMode);
  };

  /**
   * Sets `mode` to a specific value (`light | dark`)
   */
  const handleSetMode = (mode: Mode) => {
    setMode(mode);
    setModeInLS(mode);
    setModeOnBody(mode);
    document.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: mode }));
  };

  return { mode, setMode: handleSetMode, toggleMode };
};

const setModeInLS = (mode: Mode) => {
  localStorage.setItem(LS_THEME_MODE, mode);
};

const setModeOnBody = (mode: Mode) => {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const prefersColorScheme: () => Mode = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialMode: () => Mode = () => {
  if (!isClient()) return 'light';

  const LSMode = localStorage.getItem(LS_THEME_MODE) as Mode | undefined;

  return LSMode ?? prefersColorScheme();
};
