import { describe, it, expect } from "vitest";
import { getUpstreamForms } from "../domain/dag/getUpstreamForms";
import type { FormsMap } from "../types/types";

describe("getUpstreamForms", () => {
  it("returns all upstream dependencies", () => {
    const forms: FormsMap = {
      A: { id: "A", name: "A", fields: [], dependencies: [] },
      B: { id: "B", name: "B", fields: [], dependencies: ["A"] },
      C: { id: "C", name: "C", fields: [], dependencies: ["B"] },
    };

    const result = getUpstreamForms(forms, "C");

    const ids = result.map((f) => f.id);

    expect(ids).toContain("A");
    expect(ids).toContain("B");
  });

  it("returns empty upstream for root node", () => {
    const forms: FormsMap = {
      A: { id: "A", name: "A", fields: [], dependencies: [] },
    };

    const result = getUpstreamForms(forms, "A");

    expect(result).toEqual([]);
  });
});