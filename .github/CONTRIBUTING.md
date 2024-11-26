# Contributing to flowbite-react

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:

- Star the project
- Tweet about it
- Refer this project in your project's readme
- Mention the project at local meetups and tell your friends/colleagues

## Code of Conduct

This project has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct. Everyone is expected to adhere to these rules, so please read the [full text](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Thank you.

## I Have a Question

**If you want to ask a question, we assume that you have read the available [Documentation](https://flowbite-react.com/docs/getting-started/introduction).**

Before you ask a question, it is best to search for existing [Issues](https://github.com/themesberg/flowbite-react/issues) that might help you. We also have a [Discord server](https://discord.gg/flowbite-902911619032576090) where you can ask questions and get help from the community directly. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/themesberg/flowbite-react/issues/new).
- Follow the [Issue template](https://github.com/themesberg/flowbite-react/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) and fill it out as completely as possible. Don't forget to:
  - Provide as much context as you can about what you're running into.
  - Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

### Legal Notice

When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the [project license](https://github.com/themesberg/flowbite-react/blob/main/LICENSE).

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](https://flowbite-react.com/docs/getting-started/introduction). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/themesberg/flowbite-react/issues?q=label%3A%22%3Abug%3A+bug%22).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/themesberg/flowbite-react/issues/new).
- Follow the [Issue template for bug reports](https://github.com/themesberg/flowbite-react/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) to the best of your ability.

Don't forget to:

- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the _reproduction steps_ that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs info`. Bugs with the `needs info` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `confirmed`, as well as possibly other tags (such as `bug`, `help wanted`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for flowbite-react, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://flowbite-react.com/docs/getting-started/introduction) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/themesberg/flowbite-react/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/themesberg/flowbite-react/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Follow the [Issue template for feature requests](https://github.com/themesberg/flowbite-react/blob/main/.github/ISSUE_TEMPLATE/feature_request.md) to the best of your ability.

Don't forget to:

- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
- **Explain why this enhancement would be useful** to most flowbite-react users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

#### Prerequisites

- You need to understand how to use a terminal, `Git`, `Node.js`, and `Bun`
- You should be able to write `Markdown` and `React TypeScript`
- You should be familiar with `Tailwind` `CSS`, `ESLint`, and `Prettier`
- You should understand what [vitest](https://vitest.dev/) is, and be able to write tests if your contribution changes the behavior of the library in some way
- You should strongly consider using [Visual Studio Code](https://code.visualstudio.com/) as your editor, as it has plugins for `Tailwind CSS`, `ESLint`, and `Prettier` which will automatically fix most style issues for you, and offer suggestions for how to fix the rest

#### Creating a Pull Request

1. [Fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. Clone the fork and add a remote called `upstream`:

```bash
git clone https://github.com/<your username>/flowbite-react.git
cd flowbite-react
git remote add upstream https://github.com/themesberg/flowbite-react.git
```

3. Create a new branch named after your PR:

```bash
git checkout -b fix/accordion-alwaysopen
```

4. Install dependencies with [`bun`](https://bun.sh/):

```bash
bun install
```

5. Start a development server on your machine:

```bash
bun run dev
```

6. Make sure your changes work and don't break anything else:

```bash
bun run format && bun run lint:fix && bun run test && bun run build
```

7. Push to your forked repository

```bash
git push -u origin fix/accordion-alwaysopen
```

8. Go to [the repository](https://github.com/themesberg/flowbite-react) and [create a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

9. Fill out the Pull Request template, which will be available automatically

10. At the end you need to create a new changeset, use the following command and answers the provided questions.

```bash
bunx changeset
```

#### What Happens Next?

If you have followed the steps above, your Pull Request will be reviewed by a maintainer soon. If it passes review, it will be merged into the `main` branch and will be included in the next release. If not, you will receive feedback about what needs to be improved until it is ready to be merged.

Please note that you will be expected to update the [documentation](https://flowbite-react.com/docs/getting-started/introduction) and write appropriate unit tests if your contribution changes the behavior of the library in some way.

### Improving The Documentation

The [documentation at flowbite-react.com](https://flowbite-react.com/docs/getting-started/introduction) can all be found inside the `app` folder of this repository. It's written in [Next.js](https://nextjs.org/), and we use [Markdown](https://www.markdownguide.org/cheat-sheet/) for almost all of the content, so you don't need to even be able to write React TypeScript to make documentation changes!

## Styleguides

### Files

We use [Prettier](https://prettier.io/) to format all of our code. Please make sure to run `bun run format` before committing any changes. You can also use VS Code as your editor, and install the Prettier and Tailwind CSS IntelliSense plugins to automatically format your code each time you save.

Please refer to the code written already in the project to see how we format our code, what naming conventions we use, and so on. The more consistent your code is with the rest of the project, the easier it will be to review and merge your Pull Request.

### Branches &amp; Pull Requests

Please follow the same guidelines published by [commitizen](https://github.com/commitizen/cz-cli) when you name a branch that will be used for a Pull Request. The branch name should be prefixed with the most significant change that will be introduced in the Pull Request.

For example, if you are fixing a bug in the accordion component, the branch name should be something like, `fix/accordion-does-x-wrong`.

## Attribution

This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!
