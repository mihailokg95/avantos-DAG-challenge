import type { ApiForm, ApiGraph } from "../types/api";
import type { Field, Form } from "../types/types";

export function mapGraphToForms(apiData: ApiGraph): Record<string, Form> {
  const formsById: Record<string, ApiForm> = {};

  for (const form of apiData.forms) {
    formsById[form.id] = form;
  }

  const result: Record<string, Form> = {};

  for (const node of apiData.nodes) {
    if (node.type !== "form") continue;

    const formDef = formsById[node.data.component_id];

    result[node.id] = {
      id: node.id,
      name: node.data.name,
      fields: extractFields(formDef?.field_schema),
      dependencies: node.data.prerequisites || [],
    };
  }

  return result;
}

function extractFields(fieldSchema: ApiForm["field_schema"]): Field[] {
  if (!fieldSchema?.properties) return [];

  const props = fieldSchema.properties as Record<string, { type: string; title?: string }>;

  return Object.entries(props).map(([key, value]) => ({
    id: key,
    name: value.title || key,
    type: value.type,
  }));
}