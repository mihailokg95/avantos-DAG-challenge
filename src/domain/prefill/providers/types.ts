import type { Form, FormsMap } from "../../../types/types";

export type PrefillSourceOption =
  | { type: "form-fields"; label: string; value: { sourceFormId: string; sourceFieldId: string } }
  | { type: "global"; label: string; value: { key: string } };

export type PrefillSourceProvider = {
  type: string;
  getOptions: (params: {
    currentForm: Form;
    allForms: FormsMap;
  }) => PrefillGroup[];
};

export type PrefillTreeField = {
  label: string;
  option: PrefillSourceOption;
};

export type PrefillTreeNode = {
  label: string;
  children: PrefillTreeField[];
};

export type PrefillGroup = {
  groupLabel: string;
  nodes: PrefillTreeNode[];
};