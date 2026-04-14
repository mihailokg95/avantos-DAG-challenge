import type { PrefillSourceProvider } from "./types";

export const globalProvider: PrefillSourceProvider = {
  type: "global",

  getOptions() {
    return [
      {
        groupLabel: "Global Data",
        nodes: [
          {
            label: "Action Properties",
            children: [
              {
                label: "Created At",
                option: {
                  type: "global",
                  label: "Created At",
                  value: { key: "created_at" },
                },
              },
            ],
          },
          {
            label: "Client Organisation",
            children: [
              {
                label: "Name",
                option: {
                  type: "global",
                  label: "Organisation Name",
                  value: { key: "org_name" },
                },
              },
            ],
          },
        ],
      },
    ];
  },
};