const cache = new Map<string, string>();

/**
 * Applies a prefix to class names.
 *
 * @param classNames - A string containing one or more CSS class names separated by spaces
 * @param prefix - The prefix to be added to each class name
 * @returns A new string with the prefix applied to each class name
 */
export function applyPrefix(classNames: string, prefix: string): string {
  if (!classNames.trim().length || !prefix.trim().length) {
    return classNames;
  }

  classNames = classNames.trim();
  prefix = prefix.trim();

  const cacheKey = `${classNames}.${prefix}`;
  const cacheValue = cache.get(cacheKey);

  if (cacheValue) {
    return cacheValue;
  }

  const result = classNames
    .split(/\s+/)
    .map((className) => {
      className = className.trim();

      if (!className.length || className.startsWith(prefix)) {
        return className;
      }

      return `${prefix}:${className}`;
    })
    .join(" ");

  cache.set(cacheKey, result);

  return result;
}
