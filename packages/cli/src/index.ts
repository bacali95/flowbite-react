#!/usr/bin/env node
import { createProject } from "./actions/create-project.js";
import { getGit, initGit } from "./actions/git.js";
import { help } from "./actions/help.js";
import { intro } from "./actions/intro.js";
import { nextSteps } from "./actions/next-steps.js";
import { getProjectName } from "./actions/project-name.js";
import { getTemplate } from "./actions/template.js";
import { version } from "./actions/version.js";
import { getContext } from "./context.js";

async function main(argv: string[]) {
  const context = getContext(argv);

  if (context.help) {
    return help();
  }

  if (context.version) {
    return version();
  }

  intro();

  const projectName = await getProjectName(context);
  const template = await getTemplate(context);
  const git = await getGit(context);

  await createProject({ projectName, template });

  if (git) {
    await initGit({ projectName });
  }

  nextSteps({ projectName });
}

const argv = process.argv.slice(2).filter((arg) => arg !== "--");

main(argv).catch(console.error);
