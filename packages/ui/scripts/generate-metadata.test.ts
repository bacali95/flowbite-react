import { describe, expect, it } from "vitest";
import { extractClassList, extractDependencyList } from "./generate-metadata";

describe("extractClassList", () => {
  it("should extract class names from createTheme function call", async () => {
    const content = `
            createTheme({
                button: "bg-blue-500 hover:bg-blue-600"
            });
        `;

    const result = await extractClassList(content);
    expect(result).toEqual(["bg-blue-500", "hover:bg-blue-600"]);
  });

  it("should extract and sort multiple class names", async () => {
    const content = `
            createTheme({
                button: "z-10 bg-red-500",
                card: "m-2 p-4"
            });
        `;

    const result = await extractClassList(content);
    expect(result).toEqual(["bg-red-500", "m-2", "p-4", "z-10"]);
  });

  it("should handle empty strings", async () => {
    const content = `
            createTheme({
                button: ""
            });
        `;

    const result = await extractClassList(content);
    expect(result).toEqual([]);
  });

  it("should ignore class names outside createTheme", async () => {
    const content = `
            const classes = "bg-blue-500";
            createTheme({
                button: "text-white"
            });
        `;

    const result = await extractClassList(content);
    expect(result).toEqual(["text-white"]);
  });

  it("should handle multiple createTheme calls", async () => {
    const content = `
            createTheme({
                button: "btn-primary"
            });
            createTheme({
                card: "card-default"
            });
        `;

    const result = await extractClassList(content);
    expect(result).toEqual(["btn-primary", "card-default"]);
  });
});

describe("extractDependencyList", () => {
  it("should extract named imports", async () => {
    const content = `
      import { Button, Card } from '@flowbite/react';
    `;
    const result = await extractDependencyList(content);
    expect(result).toEqual(["Button", "Card"]);
  });

  it("should handle multiple import statements", async () => {
    const content = `
      import { Button } from '@flowbite/react';
      import { Modal, Table } from '@flowbite/react';
    `;
    const result = await extractDependencyList(content);
    expect(result).toEqual(["Button", "Modal", "Table"]);
  });
  it("should handle empty content", async () => {
    const content = "";
    const result = await extractDependencyList(content);
    expect(result).toEqual([]);
  });

  it("should ignore default imports", async () => {
    const content = `
        import Default, { Named } from '@flowbite/react';
      `;
    const result = await extractDependencyList(content);
    expect(result).toEqual(["Named"]);
  });

  it("should sort imports alphabetically", async () => {
    const content = `
        import { Zebra, Beta, Alpha } from '@flowbite/react';
      `;
    const result = await extractDependencyList(content);
    expect(result).toEqual(["Alpha", "Beta", "Zebra"]);
  });
});
