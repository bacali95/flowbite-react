import type { StoreInitProps } from ".";
import { setStore } from "..";

export function StoreInitServer(props: StoreInitProps) {
  setStore(props);

  return null;
}

StoreInitServer.displayName = "StoreInitServer";
