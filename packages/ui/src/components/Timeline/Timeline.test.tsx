import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import type { TimelineProps } from "./Timeline";
import { Timeline } from "./Timeline";
import { TimelineBody } from "./TimelineBody";
import { TimelineContent } from "./TimelineContent";
import { TimelineItem } from "./TimelineItem";
import { TimelinePoint } from "./TimelinePoint";
import { TimelineTime } from "./TimelineTime";
import { TimelineTitle } from "./TimelineTitle";

describe("Components / Timeline", () => {
  describe("Rendering horizontal mode", () => {
    it("should remove margin-top when do not icon", () => {
      render(<TestTimelineNoIcon horizontal={true} />);

      expect(timelinePoint()).toBeInTheDocument();
      expect(timelinePoint().childNodes[0]).not.toHaveClass("mt-1.5");
    });

    it("should show icon when render", () => {
      render(<TestTimelineWithIcon horizontal={true} />);

      expect(timelinePoint()).toBeInTheDocument();
      expect(timelinePoint().childNodes[0]).toContainHTML("svg");
    });

    it("should use `horizontal` classes of content if provided", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon horizontal={true} />
        </ThemeProvider>,
      );

      expect(timelineContent()).toHaveClass(horizontalContentClass);
    });

    it("should not use `vertical` classes of content if provided", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon horizontal={true} />
        </ThemeProvider>,
      );

      expect(timelineContent()).not.toHaveClass(verticalContentClass);
    });
  });
  describe("Rendering vertical mode", () => {
    it("should have margin-top when do not icon", () => {
      render(<TestTimelineNoIcon horizontal={false} />);

      expect(timelinePoint()).toBeInTheDocument();
      expect(timelinePoint().childNodes[0]).toHaveClass("mt-1.5");
    });

    it("should show icon when render", () => {
      render(<TestTimelineWithIcon horizontal={false} />);

      expect(timelinePoint()).toBeInTheDocument();
      expect(timelinePoint().childNodes[0]).toContainHTML("svg");
    });

    it("should use `vertical` classes of content if provided", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon />
        </ThemeProvider>,
      );

      expect(timelineContent()).toHaveClass(verticalContentClass);
    });

    it("should not use `horizontal` classes of content if provided", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon />
        </ThemeProvider>,
      );

      expect(timelineContent()).not.toHaveClass(horizontalContentClass);
    });
  });
  describe("Theme", () => {
    it("should use `base` classes of content in horizontal mode", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon horizontal={true} />
        </ThemeProvider>,
      );

      expect(timelineContent()).toHaveClass(baseContentClass);
    });

    it("should use `base` classes of content in vertical mode", () => {
      render(
        <ThemeProvider theme={theme}>
          <TestTimelineNoIcon />
        </ThemeProvider>,
      );

      expect(timelineContent()).toHaveClass(baseContentClass);
    });
  });
});

function TestTimelineNoIcon({ horizontal, className }: TimelineProps): JSX.Element {
  return (
    <Timeline horizontal={horizontal} className={className}>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime>February 2022</TimelineTime>
          <TimelineTitle>Application UI code in Tailwind CSS</TimelineTitle>
          <TimelineBody>
            Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
            E-commerce & Marketing pages.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function TestTimelineWithIcon({ horizontal, className }: TimelineProps): JSX.Element {
  return (
    <Timeline horizontal={horizontal} className={className}>
      <TimelineItem>
        <TimelinePoint icon={IconSVG} />
        <TimelineContent>
          <TimelineTime>February 2022</TimelineTime>
          <TimelineTitle>Application UI code in Tailwind CSS</TimelineTitle>
          <TimelineBody>
            Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
            E-commerce & Marketing pages.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

const IconSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M
      5 13l4 4L19 7"
    />
  </svg>
);

const timelinePoint = () => screen.getByTestId("timeline-point");
const timelineContent = () => screen.getByTestId("timeline-content");

const baseContentClass = "dummy-base-content";
const verticalContentClass = "dummy-vertical-content";
const horizontalContentClass = "dummy-horizontal-content";

const theme: CustomFlowbiteTheme = {
  timeline: {
    item: {
      content: {
        root: {
          base: baseContentClass,
          vertical: verticalContentClass,
          horizontal: horizontalContentClass,
        },
      },
    },
  },
};
