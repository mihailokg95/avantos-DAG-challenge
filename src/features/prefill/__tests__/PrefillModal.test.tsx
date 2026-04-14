import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PrefillModal } from "../components/PrefillModal";
import '@testing-library/jest-dom/vitest';

const mockForm = {
  id: "A",
  name: "Form A",
  fields: [],
  dependencies: [],
};

const mockForms = {
  A: mockForm,
};

vi.mock("../../../domain/prefill/getPrefillOptions", () => ({
  getPrefillOptions: () => [
    {
      groupLabel: "Test Group",
      nodes: [
        {
          label: "Form B",
          children: [
            {
              label: "Form B.email",
              option: {
                type: "form-fields",
                value: {
                  sourceFormId: "B",
                  sourceFieldId: "email",
                },
              },
            },
          ],
        },
      ],
    },
  ],
}));

describe("PrefillModal", () => {
  it("renders when open", () => {
    render(
      <PrefillModal
        isOpen={true}
        form={mockForm}
        forms={mockForms}
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Select data element to map"),
    ).toBeInTheDocument();
  });

  it("calls onClose when ESC pressed", () => {
    const onClose = vi.fn();

    render(
      <PrefillModal
        isOpen={true}
        form={mockForm}
        forms={mockForms}
        onClose={onClose}
        onSelect={vi.fn()}
      />,
    );

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });

  it("filters options with search", () => {
  render(
    <PrefillModal
      isOpen={true}
      form={mockForm}
      forms={mockForms}
      onClose={vi.fn()}
      onSelect={vi.fn()}
    />,
  );

  fireEvent.click(screen.getByText("Test Group"));
  fireEvent.click(screen.getByText("Form B"));

  const input = screen.getByPlaceholderText("Search fields...");
  fireEvent.change(input, { target: { value: "email" } });

  expect(screen.getByText("Form B.email")).toBeInTheDocument();
});

  it("calls onSelect when clicking option", () => {
  const onSelect = vi.fn();

  render(
    <PrefillModal
      isOpen={true}
      form={mockForm}
      forms={mockForms}
      onClose={vi.fn()}
      onSelect={onSelect}
    />,
  );

  fireEvent.click(screen.getByText("Test Group"));
  fireEvent.click(screen.getByText("Form B"));
  fireEvent.click(screen.getByText("Form B.email"));

  expect(onSelect).toHaveBeenCalled();
});

it("selects first option on Enter", () => {
  const onSelect = vi.fn();

  render(
    <PrefillModal
      isOpen={true}
      form={mockForm}
      forms={mockForms}
      onClose={vi.fn()}
      onSelect={onSelect}
    />,
  );

  fireEvent.keyDown(window, { key: "Enter" });

  expect(onSelect).toHaveBeenCalled();
});
});