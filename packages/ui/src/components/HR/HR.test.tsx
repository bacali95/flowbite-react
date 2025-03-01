import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HR } from "./HR";
import { HRIcon } from "./HRIcon";
import { HRSquare } from "./HRSquare";
import { HRText } from "./HRText";
import { HRTrimmed } from "./HRTrimmed";

describe.concurrent("Components / HR", () => {
  it("should have data-testid='flowbite-hr' in the document", () => {
    const defaultHRTestId = render(<HR />).getByTestId("flowbite-hr");

    expect(defaultHRTestId).toBeInTheDocument();
  });

  it("should have data-testid='flowbite-hr-icon' in the document", () => {
    const iconHRTestId = render(<HRIcon />).getByTestId("flowbite-hr-icon");

    expect(iconHRTestId).toBeInTheDocument();
  });

  it("should have data-testid='flowbite-hr-square' in the document", () => {
    const squareHRTestId = render(<HRSquare />).getByTestId("flowbite-hr-square");

    expect(squareHRTestId).toBeInTheDocument();
  });

  it("should have data-testid='flowbite-hr-text' in the document", () => {
    const textHRTestId = render(<HRText text="or" />).getByTestId("flowbite-hr-text");

    expect(textHRTestId).toBeInTheDocument();
  });

  it("should have 'role=separator' in the document", () => {
    const separatorTextHRTestId = render(<HRText text="or" />).getAllByRole("separator");

    separatorTextHRTestId.forEach((separator) => {
      expect(separator).toBeInTheDocument();
    });
  });

  it("should have data-testid='flowbite-hr-trimmed' in the document", () => {
    const getByDisplayValueHRTestId = render(<HRTrimmed />).getByTestId("flowbite-hr-trimmed");

    expect(getByDisplayValueHRTestId).toBeInTheDocument();
  });
});
