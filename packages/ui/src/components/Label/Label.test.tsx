import { render, screen } from "@testing-library/react";
import { HiGlobe, HiLockClosed } from "react-icons/hi";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import type { CustomFlowbiteTheme } from "../../types";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { FileInput } from "../FileInput";
import { HelperText } from "../HelperText";
import { Radio } from "../Radio";
import { RangeSlider } from "../RangeSlider";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { TextInput } from "../TextInput";
import { ToggleSwitch } from "../ToggleSwitch";
import { Label } from "./Label";

describe("Components / Label", () => {
  describe("A11y", () => {
    it("should provide accessible name to any form control associated by `htmlFor`", () => {
      const inputLabels = [
        "Your email",
        "Your password",
        "Remember me",
        "Enable notifications",
        "Upload file",
        "Select your country",
        "United States",
        "Your message",
        "Price",
      ];

      render(<TestForm />);

      inputLabels.forEach((label) => expect(screen.getByLabelText(label)).toHaveAccessibleName(label));
    });
  });

  describe("Theme", () => {
    it("should use `disabled` classes", () => {
      const theme: CustomFlowbiteTheme = {
        label: {
          root: {
            disabled: "opacity-50",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <Label disabled data-testid="flowbite-label" />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("flowbite-label")).toHaveClass("opacity-50");
    });
  });
});

const TestForm = (): JSX.Element => (
  <form>
    <div>
      <ToggleSwitch checked={false} label="Enable notifications" onChange={console.log} />
    </div>
    <div>
      <Label htmlFor="email">Your email</Label>
      <TextInput id="email" type="email" placeholder="name@flowbite.com" required />
    </div>
    <div>
      <Label htmlFor="password">Your password</Label>
      <TextInput
        addon="Make sure it is at least 12 characters!"
        icon={HiLockClosed}
        id="password"
        type="password"
        required
      />
    </div>
    <div>
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>
    <div>
      <Label htmlFor="countries">Select your country</Label>
      <Select addon={<span>Or just pick any country</span>} icon={HiGlobe} id="countries">
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
      <HelperText>Or just pick any country</HelperText>
    </div>
    <div>
      <Label htmlFor="file">Upload file</Label>
      <FileInput id="file" />
      <HelperText>A profile picture is useful to confirm your are logged into your account</HelperText>
    </div>
    <fieldset>
      <legend>Choose your favorite country</legend>
      <div>
        <Radio id="united-state" name="countries" value="USA" defaultChecked />
        <Label htmlFor="united-state">United States</Label>
      </div>
      <div>
        <Radio id="germany" name="countries" value="Germany" />
        <Label htmlFor="germany">Germany</Label>
      </div>
      <div>
        <Radio id="spain" name="countries" value="Spain" />
        <Label htmlFor="spain">Spain</Label>
      </div>
      <div>
        <Radio id="uk" name="countries" value="United Kingdom" />
        <Label htmlFor="uk">United Kingdom</Label>
      </div>
      <div>
        <Radio id="china" name="countries" value="China" disabled />
        <Label>China (disabled)</Label>
      </div>
      <div>
        <Label htmlFor="comment">Your message</Label>
        <Textarea id="comment" rows={4} required />
        <HelperText>Leave a comment...</HelperText>
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <RangeSlider id="price" min={0} max={100} />
      </div>
    </fieldset>
    <Button type="submit">Submit</Button>
  </form>
);
