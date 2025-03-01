"use client";

import type { StoreInitProps } from ".";
import { setStore } from "..";

export function StoreInitClient(props: StoreInitProps) {
  setStore(props);

  return null;
}

StoreInitClient.displayName = "StoreInitClient";
