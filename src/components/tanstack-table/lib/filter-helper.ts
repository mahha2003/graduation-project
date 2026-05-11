import { validateFilters } from "@/lib/model-helper/validate-filters";

type defaultOperators = "eq" | "ne" | "isEmpty" | "isNotEmpty";
type OperatorsByType =
  | {
      operator: defaultOperators | "iLike" | "notILike" | "contains";
      type: "text";
    }
  | {
      operator: defaultOperators | "gt" | "lt" | "gte" | "lte";
      type: "number";
    }
  | {
      operator: defaultOperators;
      type: "boolean";
    }
  | {
      operator: defaultOperators | "gt" | "gte" | "lt" | "lte";
      type: "date";
    };

type filterDetails = {
  id: string;
  value: number | string;
  column_key: string;
} & OperatorsByType;

/**
 * Build the filter item
 * @param details - the filter details
 * @returns the filter item like `"{"id":"id","operator":"operator","type":"type","value":"value","rowId":"rowId"}"`
 */
export function filterItem(details: filterDetails) {
  return `{"id":"${details.id}","operator":"${details.operator}","type":"${details.type}","value":"${details.value}","rowId":"${details.column_key}-${Math.random() * 10 ** 5}"}`;
}

/**
 * Build the filter query string
 * @param filters - the filters to build
 * @param withKey - add filter query key to the returned string like `"filters=[filter1,filter2,filter3]"`
 * @returns the filter query string like `"filters=[filter1,filter2,filter3]"` or `"[filter1,filter2,filter3]"`
 */
export function filterBuilder({
  filters,
  withKey = true,
}: {
  filters: filterDetails[];
  withKey?: boolean;
}) {
  if (withKey) {
    return `filters=[${filters.map(filterItem).join(",")}]`;
  } else {
    return `[${filters.map(filterItem).join(",")}]`;
  }
}

/**
 * Add a filter item to the filter query string
 * @param filter - the filter query string
 * @param filterItems - the filter items to add
 * @returns the filter query string like `"filters=[filter1,filter2,filter3]"` or `"[filter1,filter2,filter3]"`
 */
export function addFilterItem(
  filter: string,
  filterItems: Parameters<typeof filterItem>[0][]
) {
  const validFilters = validateFilters(filter);
  if (!validFilters) return `[${filterItems.map(filterItem).join(",")}]`;
  else
    return `${JSON.stringify(validFilters).replace("]", `,${filterItems.map(filterItem).join(",")}]`)}`;
}

/**
 * Remove a filter item from the filter query string
 * @param filter - the filter query string
 * @param filterItemId - the filter item id to remove
 * @returns the filter query string like `"filters=[filter1,filter2,filter3]"` or `"[filter1,filter2,filter3]"`
 */
export function removeFilterItem(filter: string, filterItemId: string) {
  const validFilters = validateFilters(filter);
  if (!validFilters) return `[]`;
  else
    return JSON.stringify(
      validFilters.filter((filter: filterDetails) => filter.id !== filterItemId)
    );
}
