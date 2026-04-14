import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PrefillEditor } from "../components/PrefillEditor";
import '@testing-library/jest-dom/vitest';

const form = {
  id: "A",
  name: "Form A",
  fields: [{ id: "email", name: "Email", type: "string" }],
  dependencies: [],
};

const forms = { A: form };

describe("PrefillEditor", () => {
  it("renders fields", () => {
    render(<PrefillEditor form={form} forms={forms} />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("adds mapping after select", () => {
    render(<PrefillEditor form={form} forms={forms} />);

    fireEvent.click(screen.getByText("Email"));

    expect(screen.getByText("Prefill")).toBeInTheDocument();
  });
});