import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import type { AccordionProps } from "./Accordion";
import { Accordion } from "./Accordion";
import { AccordionContent } from "./AccordionContent";
import { AccordionPanel } from "./AccordionPanel";
import { AccordionTitle } from "./AccordionTitle";

describe("Components / Accordion", () => {
  describe("A11y", () => {
    it("should use `aria-label` if provided", () => {
      render(<TestAccordion aria-label="My accordion" />);

      expect(accordion()).toHaveAccessibleName("My accordion");
    });

    it('should use `aria-labelledby=""` in `AccordionContent` if provided', () => {
      render(<TestAccordion />);

      expect(content()[0]).toHaveAccessibleName("Title");
      expect(content()[0]).toHaveAttribute("aria-labelledby", "accordion-title");
    });

    it('should use `role="button"` in `AccordionTitle`', () => {
      render(<TestAccordion />);

      titles().forEach((title) => {
        expect(title).toBeInTheDocument();
      });
    });

    it('should use `id=""` if provided in `AccordionTitle`', () => {
      render(<TestAccordion aria-label="My accordion" />);

      expect(accordion()).toHaveAccessibleName("My accordion");
    });

    it("shouldn't include `arrowIcon` in `AccordionTitle` label", () => {
      render(<TestAccordion />);

      titles().forEach((title) => expect(title).toHaveAccessibleName("Title"));
    });
  });

  describe("Keyboard interactions", () => {
    it("should open focused panel, and close others when `Space` is pressed on an `AccordionPanel`", async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      for (const _ of titles()) {
        await user.tab();
      }
      await user.keyboard("[Space]");

      expect(content()[0]).not.toBeVisible();
      expect(content()[1]).toBeVisible();
    });

    it("should open and close self when `Space is pressed on the same`AccordionPanel`", async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      for (const _ of titles()) {
        await user.tab();
      }
      await user.keyboard("[Space]");
      await user.keyboard("[Space]");

      expect(content()[0]).not.toBeVisible();
      expect(content()[1]).not.toBeVisible();
    });
    it("should open focused panel without closing others on an `AccordionPanel` with `alwaysOpen={true}`", async () => {
      const user = userEvent.setup();
      render(<TestAccordion alwaysOpen />);

      for (const _ of titles()) {
        await user.tab();
      }

      await user.keyboard("[Space]");

      expect(titles()[0]).toBeVisible();
      expect(titles()[1]).toBeVisible();
    });

    it("should be possible to `Tab` out", async () => {
      const user = userEvent.setup();
      render(
        <>
          <TestAccordion />
          <button role="checkbox">Outside button</button>
        </>,
      );

      const outsideButton = screen.getByText("Outside button");

      await waitFor(async () => {
        await user.tab();

        expect(outsideButton).toHaveFocus();
      });
    });

    it("should give each `AccordionTitle` focus in order while pressing `Tab`", async () => {
      const user = userEvent.setup();
      render(<TestAccordion />);

      for (const title of titles()) {
        await user.tab();

        expect(title).toHaveFocus();
      }
    });
  });

  describe("Props", () => {
    it('should use any HTML heading element in `AccordionTitle as=".."`', () => {
      render(<TestAccordion />);

      expect(headings()[0].tagName.toLocaleLowerCase()).toEqual("h3");
      expect(headings()[1].tagName.toLocaleLowerCase()).toEqual("h2");
    });
  });

  describe("Theme", () => {
    describe("`Accordion`", () => {
      it("should use custom `base` classes", () => {
        const theme: CustomFlowbiteTheme = {
          accordion: {
            root: {
              base: "text-4xl",
            },
          },
        };

        render(
          <ThemeProvider theme={theme}>
            <TestAccordion />
          </ThemeProvider>,
        );

        expect(accordion()).toHaveClass("text-4xl");
      });

      it("should use custom `flush` classes", () => {
        const theme: CustomFlowbiteTheme = {
          accordion: {
            root: {
              flush: {
                off: "text-4xl",
                on: "text-3xl",
              },
            },
          },
        };

        render(
          <ThemeProvider theme={theme}>
            <TestAccordion />
            <TestAccordion flush />
          </ThemeProvider>,
        );

        const accordions = screen.getAllByTestId("flowbite-accordion");
        const normal = accordions[0];
        const flush = accordions[1];

        expect(normal).toHaveClass("text-4xl");
        expect(flush).toHaveClass("text-3xl");
      });
    });

    describe("`AccordionContent`", () => {
      it("should use custom `content` classes", () => {
        const theme: CustomFlowbiteTheme = {
          accordion: {
            content: {
              base: "text-4xl",
            },
          },
        };

        render(
          <ThemeProvider theme={theme}>
            <TestAccordion />
          </ThemeProvider>,
        );

        content().forEach((content) => {
          expect(content).toHaveClass("text-4xl");
        });
      });
    });

    describe("`AccordionTitle`", () => {
      it("should use custom `title` classes", () => {
        const theme: CustomFlowbiteTheme = {
          accordion: {
            title: {
              arrow: {
                base: "w-8 h-8",
                open: {
                  off: "",
                  on: "text-purple-600",
                },
              },
              base: "p-3",
              flush: {
                off: "text-4xl",
                on: "text-3xl",
              },
              open: {
                off: "text-gray-400",
                on: "text-gray-600",
              },
            },
          },
        };

        render(
          <ThemeProvider theme={theme}>
            <TestAccordion alwaysOpen />
            <TestAccordion alwaysOpen flush />
          </ThemeProvider>,
        );

        const normalTitles = [titles()[0], titles()[1]];
        const flushTitles = [titles()[2], titles()[3]];
        const openTitles = [titles()[0], titles()[2]];
        const closedTitles = [titles()[1], titles()[3]];

        titles().forEach((title) => {
          expect(title).toHaveClass("p-3");
        });
        normalTitles.forEach((title) => {
          expect(title).toHaveClass("text-4xl");
        });
        flushTitles.forEach((title) => {
          expect(title).toHaveClass("text-3xl");
        });
        openTitles.forEach((title) => {
          // Note: it is being overwrited by the className prop which is expected
          expect(title).toHaveClass("text-cyan-300");
        });
        closedTitles.forEach((title) => {
          expect(title).toHaveClass("text-gray-400");
        });
      });
    });
  });
  describe("Click to toggle open", () => {
    beforeEach(() => {
      render(<TestAccordion />);
    });

    it("should open and close the accordion when title is clicked", async () => {
      const titleElements = titles();

      await userEvent.click(titleElements[1]); // open second panel
      await userEvent.click(titleElements[1]); // close second panel
      expect(content()[0]).not.toBeVisible(); // content should not be visible
      expect(content()[1]).not.toBeVisible(); // content should not be visible
    });
  });
});

const TestAccordion = (props: Omit<AccordionProps, "children">) => (
  <Accordion arrowIcon={HiOutlineArrowCircleDown} {...props}>
    <AccordionPanel>
      <AccordionTitle as="h3" className="text-cyan-300" id="accordion-title">
        Title
      </AccordionTitle>
      <AccordionContent aria-labelledby="accordion-title" className="text-cyan-300">
        <p>Content</p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel>
      <AccordionTitle>Title</AccordionTitle>
      <AccordionContent>
        <p>Content</p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
);

const accordion = () => screen.getByTestId("flowbite-accordion");

const content = () => screen.getAllByTestId("flowbite-accordion-content");

const headings = () => screen.getAllByTestId("flowbite-accordion-heading");

const titles = () => screen.getAllByRole("button");
