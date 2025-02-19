import arg from "arg";

export interface Context {
  projectName?: string;
  template?: string;
  git?: boolean;
  version?: boolean;
  help?: boolean;
}

export function getContext(argv: string[]): Context {
  const flags = arg(
    {
      "--template": String,
      "--git": Boolean,
      "--version": Boolean,
      "--help": Boolean,
      "-v": "--version",
      "-h": "--help",
    },
    { argv, permissive: true },
  );

  const cwd = flags._[0];
  const { "--template": template, "--git": git, "--version": version, "--help": help } = flags;

  return { projectName: cwd, template, git, version, help };
}
