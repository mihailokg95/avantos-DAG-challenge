import { describe, it, expect } from "vitest";
import { getPrefillOptions } from "../domain/prefill/getPrefillOptions";

describe("getPrefillOptions", () => {
  it("aggregates providers", () => {
    const result = getPrefillOptions({
      currentForm: { id: "A", name: "Form A", fields: [], dependencies: [] },
      allForms: {},
    });

    expect(Array.isArray(result)).toBe(true);
  });
});