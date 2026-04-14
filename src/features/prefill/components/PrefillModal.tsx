import { useEffect, useMemo, useState } from "react";
import { getPrefillOptions } from "../../../domain/prefill/getPrefillOptions";
import type { PrefillSourceOption } from "../../../domain/prefill/providers/types";
import type { Form, FormsMap } from "../../../types/types";

type Props = {
  isOpen: boolean;
  form: Form;
  forms: FormsMap;
  onClose: () => void;
  onSelect: (option: PrefillSourceOption) => void;
};

export function PrefillModal({
  form,
  forms,
  onClose,
  onSelect,
  isOpen,
}: Props) {
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {},
  );

  const groups = useMemo(
    () => getPrefillOptions({ currentForm: form, allForms: forms }),
    [form, forms],
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Enter") {
        const first = groups
          .flatMap((g) => g.nodes)
          .flatMap((node) => node.children)
          .find((o) => o.label.toLowerCase().includes(search.toLowerCase()));

        if (first) {
          onSelect(first.option);
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, search, groups, onClose, onSelect]);

  if (!isOpen) return null;

  function toggleGroup(groupLabel: string) {
    setExpandedGroups((prev) => ({ ...prev, [groupLabel]: !prev[groupLabel] }));
  }

  function toggleNode(nodeKey: string) {
    setExpandedNodes((prev) => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-180 max-h-[85vh] bg-white rounded-xl shadow-xl flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Select data element to map</h3>
          <p className="text-sm text-gray-500">Choose a source field</p>
        </div>

        <div className="p-3 border-b">
          <input
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search fields..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {groups.map((group) => {
            const filteredNodes = group.nodes
              .map((node) => ({
                ...node,
                children: node.children.filter((f) =>
                  f.label.toLowerCase().includes(search.toLowerCase()),
                ),
              }))
              .filter((node) => node.children.length > 0);

            if (!filteredNodes.length) return null;

            return (
              <div key={group.groupLabel}>
                <button
                  onClick={() => toggleGroup(group.groupLabel)}
                  className="w-full flex items-center justify-between text-left font-medium text-sm text-gray-700 hover:text-black"
                >
                  {group.groupLabel}
                  <span className="text-xs text-gray-400">
                    {expandedGroups[group.groupLabel] ? "−" : "+"}
                  </span>
                </button>

                {expandedGroups[group.groupLabel] && (
                  <div className="mt-2 ml-3 border-l pl-3 space-y-2">
                    {filteredNodes.length === 0 ? (
                      <div className="text-sm text-gray-400">No results</div>
                    ) : (
                      filteredNodes.map((node) => {
                        const nodeKey = `${group.groupLabel}::${node.label}`;
                        return (
                          <div key={node.label}>
                            <button
                              onClick={() => toggleNode(nodeKey)}
                              className="w-full flex items-center justify-between text-left text-xs font-medium text-gray-500 hover:text-gray-800"
                            >
                              {node.label}
                              <span className="text-gray-400">
                                {expandedNodes[nodeKey] ? "−" : "+"}
                              </span>
                            </button>

                            {expandedNodes[nodeKey] && (
                              <div className="mt-1 ml-3 border-l pl-3 space-y-1">
                                {node.children.map((field) => (
                                  <div
                                    key={field.label}
                                    onClick={() => onSelect(field.option)}
                                    className="px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-gray-100"
                                  >
                                    {field.label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
