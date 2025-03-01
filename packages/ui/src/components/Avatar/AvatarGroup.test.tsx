import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarGroup } from "./AvatarGroup";

describe("Components / Avatar.Group", () => {
  it("renders the avatar group element with the correct classname", () => {
    render(
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <AvatarGroup className="test-class">
        <div>Test child</div>
      </AvatarGroup>,
    );
    const avatarGroupElement = screen.getByTestId("avatar-group-element");
    expect(avatarGroupElement).toBeInTheDocument();
    expect(avatarGroupElement).toHaveClass("test-class");
  });

  it("merges the custom theme with the default theme", () => {
    render(
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <AvatarGroup theme={{ base: "custom-base-class" }}>
        <div>Test child</div>
      </AvatarGroup>,
    );
    const avatarGroupElement = screen.getByTestId("avatar-group-element");
    expect(avatarGroupElement).toHaveClass("custom-base-class");
  });
});
