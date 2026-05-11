import { useCallback, useState } from "react";

import { Checkbox } from "@radix-ui/react-checkbox";
import { Cell } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableCheckboxCell({ row }: Cell<any, any>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTick] = useState(0);

  const forceRender = useCallback(() => setTick((x) => x + 1), []);

  const handleRowSelect = useCallback(
    (value: boolean) => {
      row.toggleSelected(!!value);
      forceRender();
    },
    [row, forceRender]
  );

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleRowSelect}
      aria-label="Select row"
      className="translate-y-0.5 border-gray-300 dark:border-gray-500"
    />
  );
}
