import type { StoreProps } from "..";
import { StoreInitClient } from "./client";
import { StoreInitServer } from "./server";

export type StoreInitProps = StoreProps;

export function StoreInit(props: StoreInitProps) {
  return (
    <>
      <StoreInitServer {...props} />
      <StoreInitClient {...props} />
    </>
  );
}

StoreInit.displayName = "StoreInit";
