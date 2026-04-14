import { useState } from "react";
import { PrefillModal } from "./PrefillModal";
import type { PrefillSourceOption } from "../../../domain/prefill/providers/types";
import type { Field, Form, FormsMap } from "../../../types/types";

type Props = {
  form: Form;
  forms: FormsMap;
};

export function PrefillEditor({ form, forms }: Props) {
  const [modalField, setModalField] = useState<string | null>(null);
  const [mapping, setMapping] = useState<Record<string, PrefillSourceOption>>(
    {},
  );

  return (
    <div>
      <h3>Prefill</h3>

      {form.fields.map((field: Field) => {
        const mapped = mapping[field.id];

        return (
          <div key={field.id} className="space-y-2">
            {mapped ? (
              <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                <span className="text-sm">
                  {field.name}: {mapped.label}
                </span>
                <button
                  onClick={() => {
                    const copy = { ...mapping };
                    delete copy[field.id];
                    setMapping(copy);
                  }}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-200"
                >
                  X
                </button>
              </div>
            ) : (
              <div
                style={{
                  border: "1px dashed blue",
                  padding: 6,
                  cursor: "pointer",
                }}
                onClick={() => setModalField(field.id)}
                className="border border-dashed border-blue-400 px-3 py-2 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-blue-50"
              >
                {field.name}
              </div>
            )}
          </div>
        );
      })}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            console.log("Prefill mapping:", mapping);
          }}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      <PrefillModal
        isOpen={!!modalField}
        form={form}
        forms={forms}
        onClose={() => setModalField(null)}
        onSelect={(option: PrefillSourceOption) => {
          if (modalField) {
            setMapping((prev) => ({
              ...prev,
              [modalField]: option,
            }));
            setModalField(null);
          }
        }}
      />
    </div>
  );
}
