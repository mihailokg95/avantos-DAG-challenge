import { expect, test } from "vitest";
import { formFieldProvider } from "../domain/prefill/providers/formFieldProvider";

test("formFieldProvider returns fields", () => {
  const forms = {
    A: {
      id: "A",
      name: "Form A",
      fields: [{ id: "email", name: "Email", type: "string" }],
      dependencies: [],
    },
  };

  const result = formFieldProvider.getOptions({
    currentForm: forms.A,
    allForms: forms,
  });

  expect(result.length).toBeGreaterThan(0);
});