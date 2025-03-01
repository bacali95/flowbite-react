import * as p from "@clack/prompts";
import type { Context } from "../context.js";
import { DEFAULT_PROJECT_NAME } from "../data.js";
import { validateProjectName } from "../utils/validators.js";

export async function getProjectName(context: Context) {
  let data = "";

  if (context.projectName !== undefined) {
    const error = validateProjectName(context.projectName);

    if (error) {
      p.log.error(error);
      process.exit(0);
    }

    data = context.projectName;
    p.log.success(`Using project name: ${context.projectName}`);
  } else {
    const projectName = await p.text({
      message: "What is your project named?",
      placeholder: DEFAULT_PROJECT_NAME,
      defaultValue: DEFAULT_PROJECT_NAME,
      validate: (value) => validateProjectName(value),
    });

    data = String(projectName);

    if (p.isCancel(projectName)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  return data;
}
