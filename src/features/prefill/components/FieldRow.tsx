import { useState } from "react";
import { PrefillModal } from "./PrefillModal";
import type { Field, Form, PrefillSource } from "../../../types/types";
import type { PrefillSourceOption } from "../../../domain/prefill/providers/types";

type Props = {
  field: Field;
  value?: PrefillSource | null;

  formId: string;
  forms: Record<string, Form>;

  onChange: (source: PrefillSource) => void;
  onClear: () => void;
};

export function FieldRow({
  field,
  value,
  formId,
  forms,
  onChange,
  onClear,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function handleSelect(option: PrefillSourceOption) {
    let source: PrefillSource;

    if (option.type === "form-fields") {
      source = {
        type: "form_field",
        formId: option.value.sourceFormId,
        fieldId: option.value.sourceFieldId,
      };
    } else if (option.type === "global") {
      source = {
        type: "global",
        key: option.value.key,
      };
    } else {
      throw new Error("Unknown prefill option type");
    }

    onChange(source);
  }

  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm text-gray-700">{field.name}</span>

      {value ? (
        <>
          <span className="text-green-600 text-sm">{renderValue(value)}</span>
          <button
            onClick={onClear}
            className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
          >
            X
          </button>
        </>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="text-xs px-3 py-1 border rounded hover:bg-gray-100"
        >
          Select
        </button>
      )}

      <PrefillModal
        isOpen={open}
        onClose={() => setOpen(false)}
        forms={forms}
        form={forms[formId]}
        onSelect={handleSelect}
      />
    </div>
  );
}

function renderValue(value: PrefillSource) {
  if (value.type === "form_field") {
    return `${value.formId} → ${value.fieldId}`;
  }

  if (value.type === "global") {
    return `Global → ${value.key}`;
  }

  return "Unknown";
}
