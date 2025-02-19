import { describe, expect, it } from "vitest";
import { convertUtilitiesToV4 } from "./convert-utilities-to-v4";

describe("convertUtilitiesV4", () => {
  it("should return empty string when input is empty", () => {
    expect(convertUtilitiesToV4("")).toBe("");
    expect(convertUtilitiesToV4("  ")).toBe("  ");
  });

  it("should convert single utility class", () => {
    expect(convertUtilitiesToV4("shadow")).toBe("shadow-sm");
    expect(convertUtilitiesToV4("shadow-sm")).toBe("shadow-xs");
    expect(convertUtilitiesToV4("rounded")).toBe("rounded-sm");
  });

  it("should convert multiple utility classes", () => {
    expect(convertUtilitiesToV4("shadow rounded")).toBe("shadow-sm rounded-sm");
    expect(convertUtilitiesToV4("shadow-sm blur")).toBe("shadow-xs blur-sm");
  });

  it("should preserve non-mapped classes", () => {
    expect(convertUtilitiesToV4("text-lg shadow")).toBe("text-lg shadow-sm");
    expect(convertUtilitiesToV4("p-4 rounded m-2")).toBe("p-4 rounded-sm m-2");
  });

  it("should handle multiple spaces between classes", () => {
    expect(convertUtilitiesToV4("shadow    rounded")).toBe("shadow-sm    rounded-sm");
    expect(convertUtilitiesToV4("blur   drop-shadow   ring")).toBe("blur-sm   drop-shadow-sm   ring-3");
    // TODO: revisit this - it breaks anything focused using tab
    // expect(convertUtilitiesToV4("focus:outline-none")).toBe("focus:outline-hidden");
  });

  it("should convert shadow variants correctly", () => {
    expect(convertUtilitiesToV4("shadow-sm")).toBe("shadow-xs");
    expect(convertUtilitiesToV4("shadow")).toBe("shadow-sm");
    expect(convertUtilitiesToV4("shadow-md shadow")).toBe("shadow-md shadow-sm");
    expect(convertUtilitiesToV4("hover:shadow")).toBe("hover:shadow-sm");
  });

  it("should convert drop-shadow variants correctly", () => {
    expect(convertUtilitiesToV4("drop-shadow-sm")).toBe("drop-shadow-xs");
    expect(convertUtilitiesToV4("drop-shadow")).toBe("drop-shadow-sm");
    expect(convertUtilitiesToV4("drop-shadow-md drop-shadow")).toBe("drop-shadow-md drop-shadow-sm");
    expect(convertUtilitiesToV4("hover:drop-shadow")).toBe("hover:drop-shadow-sm");
  });

  it("should convert blur variants correctly", () => {
    expect(convertUtilitiesToV4("blur-sm")).toBe("blur-xs");
    expect(convertUtilitiesToV4("blur")).toBe("blur-sm");
    expect(convertUtilitiesToV4("blur-md blur")).toBe("blur-md blur-sm");
    expect(convertUtilitiesToV4("hover:blur")).toBe("hover:blur-sm");
  });

  it("should convert rounded variants correctly", () => {
    expect(convertUtilitiesToV4("rounded-sm")).toBe("rounded-xs");
    expect(convertUtilitiesToV4("rounded")).toBe("rounded-sm");
    expect(convertUtilitiesToV4("rounded-md rounded")).toBe("rounded-md rounded-sm");
    expect(convertUtilitiesToV4("hover:rounded")).toBe("hover:rounded-sm");
  });

  it("should convert outline and ring variants correctly", () => {
    // TODO: revisit this - it breaks anything focused using tab
    // expect(convertUtilitiesToV4("outline-none")).toBe("outline-hidden");
    expect(convertUtilitiesToV4("ring")).toBe("ring-3");
    expect(convertUtilitiesToV4("ring-2 ring")).toBe("ring-2 ring-3");
    expect(convertUtilitiesToV4("hover:ring")).toBe("hover:ring-3");
  });

  it("should handle complex class combinations", () => {
    expect(convertUtilitiesToV4("shadow-sm drop-shadow blur-sm rounded ring")).toBe(
      "shadow-xs drop-shadow-sm blur-xs rounded-sm ring-3",
    );

    expect(convertUtilitiesToV4("hover:shadow focus:blur active:rounded")).toBe(
      "hover:shadow-sm focus:blur-sm active:rounded-sm",
    );

    expect(convertUtilitiesToV4("sm:shadow-sm md:drop-shadow lg:blur-sm")).toBe(
      "sm:shadow-xs md:drop-shadow-sm lg:blur-xs",
    );
  });
});
