import { useState } from "react";
import type { PrefillSource, PrefillState } from "../types/types";

export function usePrefillMapping() {
  const [state, setState] = useState<PrefillState>({});

  function setPrefill(
    formId: string,
    fieldId: string,
    source: PrefillSource
  ) {
    setState(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [fieldId]: source,
      },
    }));
  }

  function clearPrefill(formId: string, fieldId: string) {
    setState(prev => {
      const newForm = { ...(prev[formId] || {}) };
      delete newForm[fieldId];

      return {
        ...prev,
        [formId]: newForm,
      };
    });
  }

  return {
    prefill: state,
    setPrefill,
    clearPrefill,
  };
}