import type { Form, FormsMap } from "../../types/types";
import type { PrefillGroup } from "./providers/types";
import { providers } from "./providers";

export function getPrefillOptions(params: {
  currentForm: Form;
  allForms: FormsMap;
}): PrefillGroup[] {
  return providers.flatMap((p) => p.getOptions(params) as PrefillGroup[]);
}