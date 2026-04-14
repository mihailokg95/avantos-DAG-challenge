import { useState } from "react";
import { useActionBlueprintGraph } from "./api/hooks/useActionBlueprintGraph";
import { FormList } from "./components/FormList";
import { PrefillEditor } from "./features/prefill/components/PrefillEditor";

export default function App() {
  const { data, loading, error } = useActionBlueprintGraph();
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  const selectedForm = selectedFormId
    ? data[selectedFormId]
    : null;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <FormList
        forms={data}
        selectedFormId={selectedFormId}
        onSelect={setSelectedFormId}
      />

      <div style={{ padding: 20, flex: 1 }}>
        {selectedForm ? (
          <PrefillEditor
            form={selectedForm}
            forms={data}
          />
        ) : (
          <div>Select a form</div>
        )}
      </div>
    </div>
  );
}