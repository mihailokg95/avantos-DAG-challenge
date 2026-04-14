import type { PrefillGroup, PrefillSourceOption } from "../../../domain/prefill/providers/types";
import TreeNode from "./TreeNode";

export default function TreeGroup({
  group,
  search,
  onSelect,
}: {
  group: PrefillGroup;
  search: string;
  onSelect: (option: PrefillSourceOption) => void;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
        {group.groupLabel}
      </div>

      <div className="space-y-1">
        {group.nodes.map((node) => (
          <TreeNode
            key={node.label}
            node={node}
            search={search}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}