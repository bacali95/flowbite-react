import * as p from "@clack/prompts";
import { $ } from "execa";
import color from "picocolors";
import { REPOS } from "../data.js";

export async function createProject({ projectName, template }: { projectName: string; template: string }) {
  const s = p.spinner();
  const repo = REPOS.find((repo) => repo.key === template)!;

  try {
    s.start("Creating the project...");

    await $`git clone --depth 1 ${repo.url} ${projectName}`;
    await $`rm -rf ${projectName}/.git`;

    s.stop(color.green("Project created successfuly!"));
  } catch (error) {
    s.stop(error as string);
    process.exit(0);
  }
}
