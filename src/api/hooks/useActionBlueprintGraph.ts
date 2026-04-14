import { useEffect, useState } from "react";
import { fetchGraph } from "../actionBlueprintGraph";
import { mapGraphToForms } from "../actionBlueprintMapper";
import type { Form } from "../../types/types";

type State = {
  data: Record<string, Form> | null;
  loading: boolean;
  error: string | null;
};

export function useActionBlueprintGraph(
  tenantId = "123",
  actionBlueprintId = "bp_456",
) {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const apiData = await fetchGraph({
          tenantId: tenantId,
          actionBlueprintId: actionBlueprintId,
        });

        const mapped = mapGraphToForms(apiData);

        if (isMounted) {
          setState({
            data: mapped,
            loading: false,
            error: null,
          });
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : typeof err === "string"
              ? err
              : "Unknown error";

          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [actionBlueprintId, tenantId]);

  return state;
}
