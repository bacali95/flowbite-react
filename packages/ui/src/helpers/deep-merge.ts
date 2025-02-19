import { deepmergeCustom } from "deepmerge-ts";

export function deepMergeStrings(merge: (values: string[]) => string) {
  return deepmergeCustom({
    mergeOthers: (values, utils) => {
      if (values.some((value) => typeof value === "string")) {
        const strings = values.filter((value) => typeof value === "string");
        const stringMap = new Set<string>();
        const uniqueStrings: string[] = [];

        for (const string of strings) {
          const parts = [...new Set(string.split(/\s+/))];

          uniqueStrings.push(parts.filter((part) => !stringMap.has(part)).join(" "));

          for (const part of parts) {
            stringMap.add(part);
          }
        }

        return merge(uniqueStrings);
      }

      return utils.actions.defaultMerge;
    },
  });
}
