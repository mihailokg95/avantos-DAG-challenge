import type { Form, FormsMap } from "../../types/types";

export function getUpstreamForms(
  forms: FormsMap,
  formId: string
) {
  const visited = new Set<string>();
  const result: Form[] = [];

  function dfs(currentId: string) {
    const form = forms[currentId];
    if (!form) return;

    for (const depId of form.dependencies || []) {
      if (!visited.has(depId)) {
        visited.add(depId);
        result.push(forms[depId]);
        dfs(depId);
      }
    }
  }

  dfs(formId);
  return result;
}