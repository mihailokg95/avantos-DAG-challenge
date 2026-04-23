import type { Form, FormsMap } from "../types/types";

type Props = {
  forms: FormsMap;
  selectedFormId: string | null;
  onSelect: (id: string) => void;
};

export function FormList({ forms, selectedFormId, onSelect }: Props) {
  return (
    <div>
      {Object.values(forms).map((form: Form) => (
        <div
          key={form.id}
          onClick={() => onSelect(form.id)}
          className={`p-2 cursor-pointer ${
            selectedFormId === form.id ? "bg-gray-200" : ""
          }`}
        >
          {form.name}
        </div>
      ))}
    </div>
  );
}