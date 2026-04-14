import { useState } from "react";
import type { PrefillSourceOption, PrefillTreeNode } from "../../../domain/prefill/providers/types";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TreeNodeProps {
  node: PrefillTreeNode;
  search: string;
  onSelect: (option: PrefillSourceOption) => void;
}

export default function TreeNode({
  node,
  search,
  onSelect,
}: TreeNodeProps) {
  const [open, setOpen] = useState(true);

  const filteredChildren = node.children.filter((child) =>
    child.label.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredChildren.length === 0) return null;

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-muted rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="font-medium text-sm">{node.label}</span>
      </div>

      {open && (
        <div className="ml-6 mt-1 space-y-1">
          {filteredChildren.map((child) => (
            <div
              key={child.label}
              onClick={() => onSelect(child.option)}
              className="px-2 py-1 text-sm cursor-pointer hover:bg-muted rounded"
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}