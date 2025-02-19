import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Components / Progress", () => {
  describe("A11y", () => {
    it('should have `role="progressbar"`', () => {
      render(<Progress textLabel="Accessible name" progress={45} />);

      expect(progressBar()).toBeInTheDocument();
    });

    it("should use `textLabel` as accessible name", () => {
      render(<Progress textLabel="Accessible name" textLabelPosition="outside" labelProgress progress={45} />);

      expect(progressBar()).toHaveAccessibleName("Accessible name");
    });

    it("should report current progress to screen readers", () => {
      render(<Progress progress={45} />);

      expect(progressBar()).toHaveAttribute("aria-valuenow", "45");
    });

    it("should only display labels if specified", () => {
      render(<Progress progress={45} labelProgress={false} textLabel="Flowbite" labelText={true} />);

      expect(progressBar()).not.toHaveTextContent("45");
      expect(progressBar()).toHaveTextContent("Flowbite");
    });

    it("should display test label inside, progress label outside", () => {
      render(
        <Progress
          progress={45}
          labelProgress={true}
          progressLabelPosition="outside"
          textLabel="Flowbite"
          labelText={true}
        />,
      );

      expect(outerLabelContainer()).toBeInTheDocument();
      expect(outerProgressLabel()).toHaveTextContent("45%");
      expect(innerTextLabel()).toHaveTextContent("Flowbite");
    });

    it("should display text label outside, progress label inside", () => {
      render(
        <Progress
          progress={45}
          labelProgress={true}
          textLabel="Flowbite"
          labelText={true}
          textLabelPosition="outside"
        />,
      );

      expect(outerLabelContainer()).toBeInTheDocument();
      expect(outerTextLabel()).toHaveTextContent("Flowbite");
      expect(innerProgressLabel()).toHaveTextContent("45%");
    });
  });
});

const progressBar = () => screen.getByRole("progressbar");
const outerLabelContainer = () => screen.getByTestId("flowbite-progress-outer-label-container");
const outerProgressLabel = () => screen.getByTestId("flowbite-progress-outer-progress-label");
const outerTextLabel = () => screen.getByTestId("flowbite-progress-outer-text-label");
const innerTextLabel = () => screen.getByTestId("flowbite-progress-inner-text-label");
const innerProgressLabel = () => screen.getByTestId("flowbite-progress-inner-progress-label");
