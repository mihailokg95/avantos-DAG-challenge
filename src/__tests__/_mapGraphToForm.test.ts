import { describe, it, expect } from "vitest";
import { mapGraphToForms } from "../api/actionBlueprintMapper";
import type { ApiGraph, ApiForm, ApiNode } from "../types/api";

describe("mapGraphToForms", () => {
  it("maps API graph to forms correctly", () => {
    const apiData: ApiGraph = {
      nodes: [
        {
          id: "node1",
          type: "form",
          data: {
            component_id: "form1",
            name: "Form A",
            prerequisites: [],
          },
        } as ApiNode,
      ],
      forms: [
        {
          id: "form1",
          name: "Form A",
          field_schema: {
            properties: {
              email: { type: "string", title: "Email" },
              name: { type: "string", title: "Full Name" },
            },
          },
        } as ApiForm,
      ],
    };

    const result = mapGraphToForms(apiData);

    expect(result).toHaveProperty("node1");
    const nodeForm = result["node1"];
    expect(nodeForm.id).toBe("node1");
    expect(nodeForm.name).toBe("Form A");
    expect(nodeForm.fields).toHaveLength(2);

    expect(nodeForm.fields[0]).toEqual({
      id: "email",
      name: "Email",
      type: "string",
    });

    expect(nodeForm.fields[1]).toEqual({
      id: "name",
      name: "Full Name",
      type: "string",
    });

    expect(nodeForm.dependencies).toEqual([]);
  });

  it("handles empty graph", () => {
    const apiData: ApiGraph = {
      nodes: [],
      forms: [],
    };

    const result = mapGraphToForms(apiData);

    expect(result).toEqual({});
  });
});