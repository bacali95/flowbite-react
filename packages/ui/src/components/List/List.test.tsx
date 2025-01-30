import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../../theme/provider";
import { List } from "./List";
import { ListItem } from "./ListItem";

describe("Components / List group", () => {
  describe("Theme", () => {
    it("should use custom classes", () => {
      const theme = {
        list: {
          root: {
            base: "asd",
          },
        },
      };

      render(
        <ThemeProvider theme={theme}>
          <TestList />
        </ThemeProvider>,
      );
      expect(listGroup()).toHaveClass("asd");
    });
  });
});

const TestList = (): JSX.Element => {
  return (
    <List>
      <ListItem>Settings</ListItem>
      <ListItem>Messages</ListItem>
      <ListItem>Download</ListItem>
    </List>
  );
};

const listGroup = () => screen.getByRole("list");
