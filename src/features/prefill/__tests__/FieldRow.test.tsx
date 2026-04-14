import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FieldRow } from "../components/FieldRow";

const field = { id: "email", name: "Email", type: "string" };
const form = { id: "A", name: "Form A", fields: [], dependencies: [] };

describe("FieldRow", () => {
  it("calls onClear when clicking X", () => {
    const onClear = vi.fn();

    render(
      <FieldRow
        field={field}
        value={{ type: "global", key: "org_name" }}
        formId="A"
        forms={{ A: form }}
        onChange={vi.fn()}
        onClear={onClear}
      />,
    );

    fireEvent.click(screen.getByText("X"));
    expect(onClear).toHaveBeenCalled();
  });
});