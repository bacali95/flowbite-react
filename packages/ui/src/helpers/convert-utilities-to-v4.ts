const cache = new Map<string, string>();

/**
 * Converts Tailwind CSS v3 utility classes to v4.
 *
 * @param {string} classNames - The string of class names to convert
 * @returns {string} The converted class names string
 */
export function convertUtilitiesToV4(classNames: string): string {
  if (!classNames.trim().length) {
    return classNames;
  }

  const cacheKey = classNames;
  const cacheValue = cache.get(cacheKey);

  if (cacheValue) {
    return cacheValue;
  }

  let result = classNames;

  for (const [regex, replacement] of regexMap) {
    result = result.replace(regex, replacement);
  }

  cache.set(cacheKey, result);

  return result;
}

/**
| v3             | v4             |
| -------------- | -------------- |
| shadow-sm      | shadow-xs      |
| shadow         | shadow-sm      |
| drop-shadow-sm | drop-shadow-xs |
| drop-shadow    | drop-shadow-sm |
| blur-sm        | blur-xs        |
| blur           | blur-sm        |
| rounded-sm     | rounded-xs     |
| rounded        | rounded-sm     |
| outline-none   | outline-hidden |
| ring           | ring-3         |
 */
const regexMap = [
  [/\b(shadow-sm)\b/g, "shadow-xs"],
  [/(?<!-)(shadow)(?!-)\b/g, "shadow-sm"],
  [/\b(drop-shadow-sm)\b/g, "drop-shadow-xs"],
  [/\b(drop-shadow)\b(?!-)/g, "drop-shadow-sm"],
  [/\b(blur-sm)\b/g, "blur-xs"],
  [/\b(blur)\b(?!-)/g, "blur-sm"],
  [/\b(rounded-sm)\b/g, "rounded-xs"],
  [/\b(rounded)\b(?!-)/g, "rounded-sm"],
  // TODO: revisit this - it breaks anything focused using tab
  // [/\b(outline-none)\b/g, "outline-hidden"],
  [/\b(ring)\b(?!-)/g, "ring-3"],
] as const;
