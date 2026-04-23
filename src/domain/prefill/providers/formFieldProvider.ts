import { getUpstreamForms } from "../../dag/getUpstreamForms";
import type { PrefillSourceProvider } from "./types";

export const formFieldProvider: PrefillSourceProvider = {
  type: "form-fields",

  getOptions({ currentForm, allForms }) {
    const upstream = getUpstreamForms(allForms, currentForm.id);

    return [
      {
        groupLabel: "Form Fields",
        nodes: upstream.map((form) => ({
          label: form.name,
          children: (form.fields ?? []).map((field) => ({
            label: field.name,
            option: {
              type: "form-fields",
              label: `${form.name}.${field.name}`,
              value: {
                sourceFormId: form.id,
                sourceFieldId: field.id,
              },
            },
          })),
        })),
      },
    ];
  },
};