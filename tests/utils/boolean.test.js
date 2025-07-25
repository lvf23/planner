import { parseBoolean } from "#utils/boolean";

describe("Boolean Utility", () => {
  describe("parseBoolean", () => {
    test("Falsy values", () => {
      expect(parseBoolean(false)).toBeFalsy();
      expect(parseBoolean("false")).toBeFalsy();
      expect(parseBoolean(0)).toBeFalsy();
      expect(parseBoolean("0")).toBeFalsy();
      expect(parseBoolean("")).toBeFalsy();
      expect(parseBoolean("FALSE")).toBeFalsy();
      expect(parseBoolean("fAlSe")).toBeFalsy();

      expect(parseBoolean(null)).toBeFalsy();
      expect(parseBoolean(undefined)).toBeFalsy();
      expect(parseBoolean()).toBeFalsy();

      expect(parseBoolean("      ")).toBeFalsy();
    });

    test("Truthy values", () => {
      expect(parseBoolean(true)).toBeTruthy();
      expect(parseBoolean("true")).toBeTruthy();
      expect(parseBoolean("1")).toBeTruthy();
      expect(parseBoolean("foo")).toBeTruthy();
      expect(parseBoolean("TRUE")).toBeTruthy();
      expect(parseBoolean("tRUE")).toBeTruthy();

      expect(parseBoolean(new Date())).toBeTruthy();
      expect(parseBoolean("  true     ")).toBeTruthy();
    });
  });
});
