"use client";

/* eslint-disable max-lines */
import * as React from "react";

import { type Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  GripVertical,
  ListFilter,
  Trash2,
} from "lucide-react";
import { customAlphabet } from "nanoid";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";

import { formatDate } from "@/components/tanstack-table/lib/utils-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "../components/sortable";
import { dataTableConfig } from "../configs/data-table";
import { useDebouncedCallback } from "../hooks/use-debounced-callback";
import {
  getDefaultFilterOperator,
  getFilterOperators,
} from "../lib/data-table";
import { getFiltersStateParser } from "../lib/parsers";
import {
  DataTableAdvancedFilterField,
  Filter,
  FilterOperator,
  JoinOperator,
} from "../types/table";
import MultiSelectFilter from "./multi-select-filter";
import SelectFilter from "./select-filter";

export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

interface DataTableFilterListProps<TData> {
  table: Table<TData>;
  filterFields: DataTableAdvancedFilterField<TData>[];
  debounceMs: number;
}

function DataTableFilterList<TData>({
  table,
  filterFields,
  debounceMs,
}: DataTableFilterListProps<TData>) {
  const id = React.useId();
  const t = useTranslations("TableConfig");

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      clearOnDefault: true,
      shallow: true,
    })
  );

  const resetPageToFirst = React.useCallback(() => {
    if (page && page !== 1) {
      void setPage(1);
    }
  }, [page, setPage]);

  const [locale] = React.useState<"ar" | "en">(
    (Cookies.get("NEXT_LOCALE") as "ar" | "en") ?? "ar"
  );

  const [selectSearchQueries, setSelectSearchQueries] = React.useState<
    Record<string, string>
  >({});
  const [multiSelectSearchQueries, setMultiSelectSearchQueries] =
    React.useState<Record<string, string>>({});

  const [filters, setFilters] = useQueryState(
    "filters",
    getFiltersStateParser(table.getRowModel().rows[0]?.original)
      .withDefault([])
      .withOptions({
        clearOnDefault: true,
        shallow: true,
      })
  );

  const [joinOperator, setJoinOperator] = useQueryState(
    "joinOperator",
    parseAsStringEnum(["and", "or"]).withDefault("and").withOptions({
      clearOnDefault: true,
      shallow: true,
    })
  );

  const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs);

  function addFilter() {
    const filterField = filterFields[0];

    if (!filterField) return;

    table.setColumnFilters([
      {
        id: filterField.id as NestedKeyOf<TData>,
        value: "",
      },
    ]);

    //@ts-expect-error filterField.id is not typed
    void setFilters([
      ...filters,
      {
        id: filterField.id as NestedKeyOf<TData>,
        value: "",
        type: filterField.type,
        operator: getDefaultFilterOperator(filterField.type),
        rowId: customAlphabet(
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          6
        )(),
        ...(filterField.relationOperator
          ? { relationOperator: filterField.relationOperator }
          : {}),
      },
    ]);

    resetPageToFirst();
  }

  function updateFilter({
    rowId,
    field,
    debounced = false,
  }: {
    rowId: string;
    field: Omit<Partial<Filter<TData>>, "rowId">;
    debounced?: boolean;
  }) {
    const filterField = filterFields.find((f) => f.id === field.id);

    const updateFunction = debounced ? debouncedSetFilters : setFilters;
    updateFunction((prevFilters) => {
      const updatedFilters = prevFilters.map((filter) => {
        if (filter.rowId === rowId) {
          return {
            ...filter,
            ...field,
            ...(filterField?.relationOperator
              ? { relationOperator: filterField.relationOperator }
              : {}),
          };
        }
        return filter;
      });

      return updatedFilters;
    });

    if (field.value !== undefined) {
      resetPageToFirst();
    }
  }

  function removeFilter(rowId: string) {
    const updatedFilters = filters.filter((filter) => filter.rowId !== rowId);
    void setFilters(updatedFilters);
    resetPageToFirst();
  }

  function moveFilter(activeIndex: number, overIndex: number) {
    void setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const [removed] = newFilters.splice(activeIndex, 1);
      if (!removed) return prevFilters;
      newFilters.splice(overIndex, 0, removed);
      return newFilters;
    });
  }

  function renderFilterInput({
    filter,
    inputId,
  }: {
    filter: Filter<TData>;
    inputId: string;
  }) {
    const filterField = filterFields.find((f) => f.id === filter.id);

    if (!filterField) return null;

    if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
      return (
        <div
          id={inputId}
          role="status"
          aria-live="polite"
          aria-label={`${filterField.label} filter is ${filter.operator === "isEmpty" ? "empty" : "not empty"}`}
          className="h-8 w-full rounded border border-dashed"
        />
      );
    }

    switch (filter.type) {
      case "text":
      case "number":
        return (
          <Input
            id={inputId}
            type={filter.type}
            aria-label={`${filterField.label} filter value`}
            aria-describedby={`${inputId}-description`}
            placeholder={filterField.placeholder ?? t("EnterValue")}
            className="h-8 w-full rounded"
            defaultValue={
              typeof filter.value === "string" ? filter.value : undefined
            }
            onChange={(event) =>
              updateFilter({
                rowId: filter.rowId,
                field: { value: event.target.value },
                debounced: true,
              })
            }
            title={typeof filter.value === "string" ? filter.value : ""}
          />
        );
      case "select":
        return (
          <SelectFilter
            filter={filter}
            filterField={filterField}
            inputId={inputId}
            updateFilter={updateFilter}
            searchQuery={selectSearchQueries[filter.rowId] || ""}
            onSearchChange={(value) => {
              setSelectSearchQueries((prev) => ({
                ...prev,
                [filter.rowId]: value,
              }));
            }}
          />
        );
      case "multi-select":
        return (
          <MultiSelectFilter
            filter={filter}
            filterField={filterField}
            inputId={inputId}
            updateFilter={updateFilter}
            searchQuery={multiSelectSearchQueries[filter.rowId] || ""}
            onSearchChange={(value) => {
              setMultiSelectSearchQueries((prev) => ({
                ...prev,
                [filter.rowId]: value,
              }));
            }}
            t={t}
          />
        );
      case "date": {
        const dateValue = Array.isArray(filter.value)
          ? filter.value.filter(Boolean)
          : [filter.value, filter.value].filter(Boolean);

        const displayValue =
          filter.operator === "isBetween" && dateValue.length === 2
            ? `${formatDate(dateValue[0] ?? new Date())} - ${formatDate(
                dateValue[1] ?? new Date()
              )}`
            : dateValue[0]
              ? formatDate(dateValue[0])
              : t("Pick a date");

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={inputId}
                variant="outline"
                size="sm"
                aria-label={`${filterField.label} date filter`}
                aria-controls={`${inputId}-calendar`}
                className={cn(
                  "h-8 w-full justify-start gap-2 rounded text-left font-normal",
                  !filter.value && "text-muted-foreground"
                )}
                title={displayValue}
              >
                <CalendarIcon
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{displayValue}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              id={`${inputId}-calendar`}
              align="start"
              className="w-auto p-0"
            >
              {filter.operator === "and" ? (
                <Calendar
                  id={`${inputId}-calendar`}
                  mode="range"
                  aria-label={`Select ${filterField.label} date range`}
                  selected={
                    dateValue.length === 2
                      ? {
                          from: new Date(dateValue[0] ?? ""),
                          to: new Date(dateValue[1] ?? ""),
                        }
                      : {
                          from: new Date(),
                          to: new Date(),
                        }
                  }
                  onSelect={(date) => {
                    updateFilter({
                      rowId: filter.rowId,
                      field: {
                        value: date
                          ? [
                              date.from
                                ? `${date.from.getFullYear()}-${String(date.from.getMonth() + 1).padStart(2, "0")}-${String(date.from.getDate()).padStart(2, "0")}T00:00:00.000Z`
                                : "",
                              date.to
                                ? `${date.to.getFullYear()}-${String(date.to.getMonth() + 1).padStart(2, "0")}-${String(date.to.getDate()).padStart(2, "0")}T00:00:00.000Z`
                                : "",
                            ]
                          : [],
                      },
                    });
                  }}
                  initialFocus
                  numberOfMonths={1}
                />
              ) : (
                <Calendar
                  id={`${inputId}-calendar`}
                  mode="single"
                  aria-label={`Select ${filterField.label} date`}
                  selected={dateValue[0] ? new Date(dateValue[0]) : undefined}
                  onSelect={(date) => {
                    updateFilter({
                      rowId: filter.rowId,
                      field: {
                        value: date
                          ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T00:00:00.000Z`
                          : "",
                      },
                    });

                    setTimeout(() => {
                      document.getElementById(inputId)?.click();
                    }, 0);
                  }}
                  initialFocus
                />
              )}
            </PopoverContent>
          </Popover>
        );
      }
      case "boolean": {
        if (Array.isArray(filter.value)) return null;

        return (
          <Select
            value={filter.value}
            onValueChange={(value) =>
              updateFilter({ rowId: filter.rowId, field: { value } })
            }
          >
            <SelectTrigger
              id={inputId}
              aria-label={`${filterField.label} boolean filter`}
              aria-controls={`${inputId}-listbox`}
              className="h-8 w-full rounded bg-transparent"
              title={filter.value ? t("True") : t("False")}
            >
              <SelectValue
                placeholder={filter.value ? t("True") : t("False")}
              />
            </SelectTrigger>
            <SelectContent id={`${inputId}-listbox`}>
              <SelectItem value="true">{t("True")}</SelectItem>
              <SelectItem value="false">{t("False")}</SelectItem>
            </SelectContent>
          </Select>
        );
      }
      default:
        return null;
    }
  }

  return (
    <Sortable
      value={filters.map((item) => ({ id: item.rowId }))}
      onMove={({ activeIndex, overIndex }) => {
        return moveFilter(activeIndex, overIndex);
      }}
      overlay={
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 h-8 min-w-18 rounded-sm" />
          <div className="bg-primary/10 h-8 w-32 rounded-sm" />
          <div className="bg-primary/10 h-8 w-32 rounded-sm" />
          <div className="bg-primary/10 h-8 min-w-36 flex-1 rounded-sm" />
          <div className="bg-primary/10 size-8 shrink-0 rounded-sm" />
          <div className="bg-primary/10 size-8 shrink-0 rounded-sm" />
        </div>
      }
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            aria-label="Open filters"
            aria-controls={`${id}-filter-dialog`}
            title={t("Filters")}
          >
            <ListFilter className="size-3" aria-hidden="true" />
            {t("Filters")}
            {filters.length > 0 && (
              <Badge
                variant="outline"
                className="h-[1.14rem] rounded-[0.2rem] px-[0.32rem] font-mono text-[0.65rem] font-normal"
              >
                {filters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          id={`${id}-filter-dialog`}
          align="start"
          collisionPadding={16}
          className={cn(
            "flex w-[calc(100vw-(--spacing(12)))] min-w-60 origin-(--radix-popover-content-transform-origin) flex-col p-4 sm:w-xl",
            filters.length > 0 ? "gap-3.5" : "gap-2",
            ""
          )}
        >
          {filters.length > 0 ? (
            <h4 className="leading-none font-medium" title={t("Filters")}>
              {t("Filters")}
            </h4>
          ) : (
            <div className="flex flex-col gap-1">
              <h4
                className="leading-none font-medium"
                title={t("NoFiltersApplied")}
              >
                {t("NoFiltersApplied")}
              </h4>
              <p
                className="text-muted-foreground text-sm"
                title={t("AddFiltersToRefineYourResults")}
              >
                {t("AddFiltersToRefineYourResults")}
              </p>
            </div>
          )}
          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto py-0.5 pr-1">
            {filters.map((filter, index) => {
              const filterId = `${id}-filter-${filter.rowId}`;
              const joinOperatorListboxId = `${filterId}-join-operator-listbox`;
              const fieldListboxId = `${filterId}-field-listbox`;
              const fieldTriggerId = `${filterId}-field-trigger`;
              const operatorListboxId = `${filterId}-operator-listbox`;
              const inputId = `${filterId}-input`;

              return (
                <SortableItem key={filter.rowId} value={filter.rowId} asChild>
                  <div className="flex items-center gap-2">
                    <div className="min-w-18 text-center">
                      {index === 0 ? (
                        <span
                          className="text-muted-foreground text-sm"
                          title={t("Where")}
                        >
                          {t("Where")}
                        </span>
                      ) : index === 1 ? (
                        <Select
                          value={joinOperator}
                          onValueChange={(value: JoinOperator) => {
                            setJoinOperator(value);
                            resetPageToFirst();
                          }}
                        >
                          <SelectTrigger
                            aria-label="Select join operator"
                            aria-controls={joinOperatorListboxId}
                            className="h-8 rounded lowercase"
                            title={joinOperator}
                          >
                            <SelectValue placeholder={joinOperator} />
                          </SelectTrigger>
                          <SelectContent
                            id={joinOperatorListboxId}
                            position="popper"
                            className="min-w-(--radix-select-trigger-width) lowercase"
                          >
                            {dataTableConfig.joinOperators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label[locale]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span
                          className="text-muted-foreground text-sm"
                          title={joinOperator}
                        >
                          {t(joinOperator)}
                        </span>
                      )}
                    </div>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          id={fieldTriggerId}
                          variant="outline"
                          size="sm"
                          role="combobox"
                          aria-label="Select filter field"
                          aria-controls={fieldListboxId}
                          className="focus:ring-ring h-8 w-32 justify-between gap-2 rounded focus:ring-1 focus:outline-none focus-visible:ring-0"
                          title={
                            filterFields.find((field) => field.id === filter.id)
                              ?.label ?? t("Select field")
                          }
                        >
                          <span className="">
                            {filterFields.find(
                              (field) => field.id === filter.id
                            )?.label ?? t("Select field")}
                          </span>
                          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        id={fieldListboxId}
                        align="start"
                        className="w-40 p-0"
                        onCloseAutoFocus={() =>
                          document.getElementById(fieldTriggerId)?.focus({
                            preventScroll: true,
                          })
                        }
                      >
                        <Command>
                          <CommandInput placeholder={t("Search fields")} />
                          <CommandList>
                            <CommandEmpty>{t("NoFieldsFound")}</CommandEmpty>
                            <CommandGroup>
                              {filterFields.map((field) => (
                                <CommandItem
                                  key={field.id}
                                  value={field.id}
                                  onSelect={(value) => {
                                    const filterField = filterFields.find(
                                      (col) => col.id === value
                                    );

                                    if (!filterField) return;

                                    updateFilter({
                                      rowId: filter.rowId,
                                      field: {
                                        id: value as NestedKeyOf<TData>,
                                        type: filterField.type,
                                        operator: getDefaultFilterOperator(
                                          filterField.type
                                        ),
                                        value: "",
                                      },
                                    });

                                    document
                                      .getElementById(fieldTriggerId)
                                      ?.click();
                                  }}
                                >
                                  <span
                                    className="mr-1.5 truncate"
                                    title={field.label}
                                  >
                                    {field.label}
                                  </span>
                                  <Check
                                    className={cn(
                                      "ml-auto size-4 shrink-0",
                                      field.id === filter.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Select
                      value={filter.operator}
                      onValueChange={(value: FilterOperator) =>
                        updateFilter({
                          rowId: filter.rowId,
                          field: {
                            operator: value,
                            value:
                              value === "isEmpty" || value === "isNotEmpty"
                                ? "value"
                                : filter.value,
                          },
                        })
                      }
                    >
                      <SelectTrigger
                        aria-label="Select filter operator"
                        aria-controls={operatorListboxId}
                        className="h-8 w-32 rounded"
                        title={filter.operator}
                      >
                        <div className="truncate">
                          <SelectValue placeholder={filter.operator} />
                        </div>
                      </SelectTrigger>
                      <SelectContent id={operatorListboxId}>
                        {getFilterOperators(filter.type).map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label[locale]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="min-w-36 flex-1">
                      {renderFilterInput({ filter, inputId })}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove filter ${index + 1}`}
                      className="size-8 shrink-0 rounded"
                      onClick={() => removeFilter(filter.rowId)}
                      title={`Remove filter ${index + 1}`}
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </Button>
                    <SortableDragHandle
                      variant="outline"
                      size="icon"
                      className="size-8 shrink-0 rounded"
                      title="Drag to reorder"
                    >
                      <GripVertical className="size-3.5" aria-hidden="true" />
                    </SortableDragHandle>
                  </div>
                </SortableItem>
              );
            })}
          </div>
          <div className="flex w-full items-center gap-2">
            <Button
              size="sm"
              className="h-[1.85rem] rounded"
              onClick={addFilter}
              title={t("AddFilter")}
            >
              {t("AddFilter")}
            </Button>
            {filters.length > 0 ? (
              <Button
                size="sm"
                variant="outline"
                className="rounded"
                onClick={() => {
                  void setFilters(null);
                  void setJoinOperator("and");
                  resetPageToFirst();
                }}
                title={t("ResetFilters")}
              >
                {t("ResetFilters")}
              </Button>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </Sortable>
  );
}

export default React.memo(DataTableFilterList) as typeof DataTableFilterList;
