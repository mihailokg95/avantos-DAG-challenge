export type FormId = string;
export type FieldId = string;

export type Field = {
  id: FieldId;
  name: string;
  type: string;
};

export type Form = {
  id: FormId;
  name: string;
  fields: Field[];
  dependencies: FormId[];
};

export type PrefillSource =
  | {
      type: "form_field";
      formId: string;
      fieldId: string;
    }
  | {
      type: "global";
      key: string;
    };

export type PrefillMapping = Record<string, PrefillSource | null>;

export type PrefillState = Record<string, PrefillMapping>;

export type FormsMap = Record<string, Form>;