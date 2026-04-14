import type { Form, FormsMap } from "../../types/types";
import type { PrefillGroup } from "./providers/types";
import { formFieldProvider } from "./providers/formFieldProvider";
import { globalProvider } from "./providers/globalProvider";

const providers = [formFieldProvider, globalProvider];
export function getPrefillOptions(params: {
  currentForm: Form;
  allForms: FormsMap;
}): PrefillGroup[] {
  return providers.flatMap((p) => p.getOptions(params) as PrefillGroup[]);
}