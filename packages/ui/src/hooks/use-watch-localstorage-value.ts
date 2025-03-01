"use client";

import { useEffect } from "react";

/**
 * Triggers `onChange` when another browser tab instance mutates the LS value.
 */
export function useWatchLocalStorageValue({
  key: watchKey,
  onChange,
}: {
  key: string;
  onChange(newValue: string | null): void;
}) {
  function handleStorageChange({ key, newValue }: StorageEvent) {
    if (key === watchKey) onChange(newValue);
  }

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
}
