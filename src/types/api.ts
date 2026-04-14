export type ApiFieldSchema = {
  properties?: Record<
    string,
    {
      type: string;
      title?: string;
    }
  >;
};

export type ApiForm = {
  id: string;
  name: string;
  field_schema: ApiFieldSchema;
};

export type ApiNode = {
  id: string;
  type: "form";
  data: {
    component_id: string;
    name: string;
    prerequisites: string[];
  };
};

export type ApiGraph = {
  nodes: ApiNode[];
  forms: ApiForm[];
};

export type ApiFieldSchemaProperty = {
  type: string;
  title?: string;
  format?: string;
};
