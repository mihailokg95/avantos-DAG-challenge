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
          style={{
            padding: 8,
            cursor: "pointer",
            background: selectedFormId === form.id ? "#eee" : "",
          }}
        >
          {form.name}
        </div>
      ))}
    </div>
  );
}