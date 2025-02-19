/**
 * Checks if the code is running in a client-side environment by verifying the existence of the window object
 *
 * @returns {boolean} Returns true if running in a browser environment, false if running in a server environment
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}
