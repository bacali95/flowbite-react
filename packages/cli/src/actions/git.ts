import * as p from "@clack/prompts";
import { $ } from "execa";
import type { Context } from "../context.js";

export async function getGit(context: Context) {
  let data: boolean;

  if (context.git) {
    data = context.git;
    p.log.success("With git initialize");
  } else {
    const git = await p.confirm({
      message: "Initialize a new git repository?",
      initialValue: true,
    });

    data = Boolean(git);

    if (p.isCancel(git)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  return data;
}

export async function initGit({ projectName }: { projectName: string }) {
  $`git init ${projectName}`;
}
