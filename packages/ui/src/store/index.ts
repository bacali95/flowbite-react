import type { ThemeMode } from "../hooks/use-theme-mode";
import type { DeepPartial } from "../types";

export type StoreProps = DeepPartial<{
  mode: ThemeMode;
  /**
   * Prefix to apply to base class list
   */
  prefix: string;
}>;

const store: StoreProps = {
  mode: undefined,
  prefix: undefined,
};

export function setStore(data: StoreProps) {
  if ("mode" in data) {
    store.mode = data.mode;
  }
  if ("prefix" in data) {
    store.prefix = data.prefix;
  }
}

export function getMode(): StoreProps["mode"] {
  return store.mode;
}

export function getPrefix(): StoreProps["prefix"] {
  return store.prefix;
}
