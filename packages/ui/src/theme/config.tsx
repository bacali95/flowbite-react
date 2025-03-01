import type { StoreProps } from "../store";
import { StoreInit } from "../store/init";

export type ThemeConfigProps = StoreProps;

export function ThemeConfig(props: ThemeConfigProps) {
  return <StoreInit {...props} />;
}

ThemeConfig.displayName = "ThemeConfig";
