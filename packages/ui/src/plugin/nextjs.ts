import type { NextConfig } from "next";
import { build, dev } from "../cli";

export default function withFlowbiteReact(nextConfig: NextConfig): NextConfig {
  if (process.env.NODE_ENV === "development") {
    return dev().finally(() => nextConfig);
  }
  if (process.env.NODE_ENV === "production") {
    return build().finally(() => nextConfig);
  }

  return nextConfig;
}
