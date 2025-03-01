const cache = new Map<string, string>();

/**
 * Applies a prefix to class names while preserving modifiers and arbitrary values.
 *
 * @param classNames - A string containing one or more CSS class names separated by spaces
 * @param prefix - The prefix to be added to each class name
 * @param separator - The separator used between class name parts (default ":")
 * @returns A new string with the prefix applied to each class name
 */
export function applyPrefixV3(classNames: string, prefix: string, separator = ":"): string {
  if (!classNames.trim().length || !prefix.trim().length) {
    return classNames;
  }

  classNames = classNames.trim();
  prefix = prefix.trim();
  separator = separator.trim();

  const cacheKey = `${classNames}.${prefix}.${separator}`;
  const cacheValue = cache.get(cacheKey);

  if (cacheValue) {
    return cacheValue;
  }

  const result = classNames
    .split(/\s+/)
    .map((className) => {
      className = className.trim();

      if (!className.length) {
        return className;
      }

      if (className.startsWith("[") && className.endsWith("]")) {
        return className;
      }

      const parts = className.split(separator);
      const baseClass = parts.pop() ?? "";

      let prefixedBaseClass = baseClass;

      let modifiers = "";
      if (prefixedBaseClass[0] === "!") {
        modifiers = "!";
        prefixedBaseClass = prefixedBaseClass.slice(1);
      }
      if (prefixedBaseClass[0] === "-") {
        modifiers += "-";
        prefixedBaseClass = prefixedBaseClass.slice(1);
      }

      if (prefixedBaseClass.startsWith(prefix)) {
        return className;
      }

      prefixedBaseClass = modifiers + prefix + prefixedBaseClass;

      if (!parts.length) {
        return prefixedBaseClass;
      }

      return `${parts.join(separator)}${separator}${prefixedBaseClass}`;
    })
    .join(" ");

  cache.set(cacheKey, result);

  return result;
}
