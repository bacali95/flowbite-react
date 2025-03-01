import * as p from "@clack/prompts";
import type { Context } from "../context.js";
import { REPOS } from "../data.js";

export async function getTemplate(context: Context) {
  let data = "";

  if (context.template !== undefined) {
    const TEMPLATES = REPOS.map((repo) => repo.key);

    if (!TEMPLATES.includes(context.template)) {
      p.log.error("Invalid template name");
      process.exit(0);
    }

    data = context.template;
    p.log.success(`Using template: ${context.template}`);
  } else {
    const template = await p.select({
      message: "What template would you like to use?",
      options: REPOS.map((repo) => ({ label: repo.name, value: repo.key })),
    });

    data = String(template);

    if (p.isCancel(template)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  return data;
}
