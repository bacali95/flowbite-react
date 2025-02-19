import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FloatingLabel } from "./FloatingLabel";

describe("Components / Floating Label", () => {
  describe("Floating Label properties", () => {
    it('should have `role="textbox"` by default', () => {
      const textInput = render(<FloatingLabel variant={"filled"} label={"Label"} />).getByRole("textbox");
      expect(textInput).toBeInTheDocument();
    });

    it("should have a label", () => {
      const input = render(<FloatingLabel variant={"filled"} label={"Label"} />).getByLabelText("Label");
      expect(input).toBeInTheDocument();
    });
    it("should update the input value correctly", () => {
      const input: HTMLInputElement | null = render(
        <FloatingLabel variant={"filled"} label={"Label"} defaultValue={"my name is"} />,
      ).getByTestId("floating-label") as HTMLInputElement;
      expect(input.value).toBe("my name is");
    });

    it("should be disabled", () => {
      const input = render(<FloatingLabel variant={"filled"} label={"Label"} disabled={true} />).getByTestId(
        "floating-label",
      );
      expect(input).toBeDisabled();
    });
  });
});
