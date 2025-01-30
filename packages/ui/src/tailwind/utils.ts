import { applyPrefix } from "../helpers/apply-prefix";
import { applyPrefixV3 } from "../helpers/apply-prefix-v3";
import { convertUtilitiesToV4 } from "../helpers/convert-utilities-to-v4";
import { getTailwindVersion } from "../helpers/get-tailwind-version";
import { CLASS_LIST_MAP } from "./class-list";
import type { ClassList, ComponentName, PluginOptions } from "./types";

export function resolveVersion(classList: ClassList): ClassList {
  const version = getTailwindVersion();

  return version === 4 ? classList.map((className) => convertUtilitiesToV4(className)) : classList;
}

export function resolvePrefix(classList: ClassList, prefix?: PluginOptions["prefix"]): ClassList {
  prefix = prefix?.trim();

  if (!prefix) {
    return classList;
  }

  const version = getTailwindVersion();

  return classList.map((className) => {
    if (version === 3) {
      return applyPrefixV3(className, prefix);
    }

    return applyPrefix(className, prefix);
  });
}

export function resolveClassList(components?: ComponentName[]): ClassList {
  let resolvedClassList: string[] = [];

  if (components?.length) {
    const invalidNames: string[] = [];

    for (const name of components) {
      if (name in CLASS_LIST_MAP) {
        resolvedClassList.push(...CLASS_LIST_MAP[name]);
      } else {
        invalidNames.push(name);
      }
    }

    if (invalidNames.length) {
      console.error(
        `\nflowbite-react/tailwind - invalid component${invalidNames.length ? "s" : ""}:\n"${invalidNames.join(", ")}"`,
      );
      console.info(`\nAvailable components:\n${Object.keys(CLASS_LIST_MAP).join(", ")}\n`);
    }
  } else {
    resolvedClassList = Object.values(CLASS_LIST_MAP).flat();
  }

  return [...new Set(resolvedClassList)];
}
