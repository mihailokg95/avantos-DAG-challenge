export async function fetchGraph(params: {
  tenantId: string;
  actionBlueprintId: string;
}) {
  const { tenantId, actionBlueprintId } = params;

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/${tenantId}/actions/blueprints/${actionBlueprintId}/graph`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch graph");
  }

  return res.json();
}
