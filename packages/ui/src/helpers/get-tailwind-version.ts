import colors from "tailwindcss/colors.js";

/**
 * Gets the major version number of the installed Tailwind CSS
 * @returns The major version number (3 or 4) or undefined if not found
 */
export function getTailwindVersion(): 3 | 4 | undefined {
  try {
    if (colors.slate[50].includes("#")) {
      return 3;
    }
    if (colors.slate[50].includes("oklch")) {
      return 4;
    }
  } catch (_) {
    return;
  }
}
