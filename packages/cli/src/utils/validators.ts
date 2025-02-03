import fs from "fs";
import { DEFAULT_PROJECT_NAME } from "../data.js";

export function validateProjectName(value: string) {
  // check empty
  if (value.length && !value.trim().length) {
    return "Value is required!";
  }

  // TODO: check regex

  // check if dir exists
  const dirs = fs.readdirSync("./");
  const computedValue = value || DEFAULT_PROJECT_NAME;

  if (dirs.includes(computedValue)) {
    return "Folder already exists";
  }
}
