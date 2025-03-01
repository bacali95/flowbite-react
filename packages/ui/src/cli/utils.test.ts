import { describe, expect, it } from "vitest";
import { addImport, wrapDefaultExport } from "./utils";

describe("addImport", () => {
  // ESM Test Cases
  describe("ESM", () => {
    it("should add import after existing imports", () => {
      const content = `
import { existingImport } from 'existing-module';

export default {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `
import { existingImport } from 'existing-module';
import newImport from "new-module";

export default {};
`;
      expect(result.trim()).toBe(expected.trim());
    });

    it("should add import at the top with two newlines if no imports exist", () => {
      const content = `
export default {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `import newImport from "new-module";

export default {};
`;
      expect(result.trim()).toBe(expected.trim());
    });

    it("should handle multi-line imports", () => {
      const content = `
import {
    existingImport1,
    existingImport2
} from 'existing-module';

export default {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `
import {
    existingImport1,
    existingImport2
} from 'existing-module';
import newImport from "new-module";

export default {};
`;
      expect(result.trim()).toBe(expected.trim());
    });
  });

  // CJS Test Cases
  describe("CJS", () => {
    it("should add require after existing requires", () => {
      const content = `
const existingImport = require('existing-module');

module.exports = {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `
const existingImport = require('existing-module');
const newImport = require("new-module");

module.exports = {};
`;
      expect(result.trim()).toBe(expected.trim());
    });

    it("should add require at the top with two newlines if no requires exist", () => {
      const content = `
module.exports = {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `const newImport = require("new-module");

module.exports = {};
`;
      expect(result.trim()).toBe(expected.trim());
    });

    it("should handle multiple requires", () => {
      const content = `
const existingImport1 = require('existing-module');
const existingImport2 = require('another-module');

module.exports = {};
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      const expected = `
const existingImport1 = require('existing-module');
const existingImport2 = require('another-module');
const newImport = require("new-module");

module.exports = {};
`;
      expect(result.trim()).toBe(expected.trim());
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    it("should return unchanged content if neither ESM nor CJS", () => {
      const content = `
// Some random content
const x = 42;
`;
      const result = addImport({
        content,
        importPath: "new-module",
        importName: "newImport",
      });

      expect(result.trim()).toBe(content.trim());
    });
  });
});

describe("wrapDefaultExport", () => {
  it("wraps ESM default export correctly", () => {
    const input = "export default myFunction;";
    const expected = "export default wrapper(myFunction);";
    expect(wrapDefaultExport(input, "wrapper")).toBe(expected);
  });

  it("wraps CJS module.exports correctly", () => {
    const input = "module.exports = myFunction;";
    const expected = "module.exports = wrapper(myFunction);";
    expect(wrapDefaultExport(input, "wrapper")).toBe(expected);
  });

  it("returns original content if no default export is found", () => {
    const input = "const a = 10;";
    expect(wrapDefaultExport(input, "wrapper")).toBe(input);
  });

  it("handles complex ESM export values", () => {
    const input = 'export default () => console.log("Hello");';
    const expected = 'export default wrapper(() => console.log("Hello"));';
    expect(wrapDefaultExport(input, "wrapper")).toBe(expected);
  });

  it("handles complex CJS export values", () => {
    const input = "module.exports = function() { return 42; };";
    const expected = "module.exports = wrapper(function() { return 42; });";
    expect(wrapDefaultExport(input, "wrapper")).toBe(expected);
  });
});
