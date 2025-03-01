import { render } from "@testing-library/react";
import { HiEye } from "react-icons/hi";
import { describe, expect, it } from "vitest";
import { TextInput } from "./TextInput";

describe.concurrent("Components / Text input", () => {
  describe.concurrent("A11y", () => {
    it('should have `role="textbox"` by default', () => {
      const textInput = render(<TextInput />).getByRole("textbox");

      expect(textInput).toBeInTheDocument();
    });
    it("should have Icon if selected", () => {
      const page = render(<TextInput rightIcon={HiEye} />).getByTestId("right-icon");

      expect(page).toBeInTheDocument();
    });
  });
});
