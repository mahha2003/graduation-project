"use client";

import * as React from "react";

import { Column } from "@tanstack/react-table";
import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { toSentenceCase } from "../lib/utils-table";
import { useTableSettings } from "../store/table-settings-store";

interface DataTableViewOptionsProps<TData> {
  columns: Column<TData, unknown>[];
  tableId: string;
}

function DataTableViewOptions<TData>({
  columns,
  tableId,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const t = useTranslations("TableConfig");
  const { setColumnVisibility } = useTableSettings();
  const settings = useTableSettings((state) => state.tables[tableId]) ?? {
    columnVisibility: {},
  };

  const toggleColumn = React.useCallback(
    (column: Column<TData, unknown>) => {
      const newVisibility = {
        ...settings.columnVisibility,
        [column.id]: !column.getIsVisible(),
      };
      setColumnVisibility(tableId, newVisibility);
      column.toggleVisibility(!column.getIsVisible());
    },
    [settings.columnVisibility, setColumnVisibility, tableId]
  );

  const hideAllColumns = React.useCallback(() => {
    const newVisibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      newVisibility[column.id] = false;
      column.toggleVisibility(false);
    });
    setColumnVisibility(tableId, newVisibility);
  }, [columns, setColumnVisibility, tableId]);

  const showAllColumns = React.useCallback(() => {
    const newVisibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      newVisibility[column.id] = true;
      column.toggleVisibility(true);
    });
    setColumnVisibility(tableId, newVisibility);
  }, [columns, setColumnVisibility, tableId]);

  const allColumnsVisible = React.useMemo(() => {
    return columns.every((column) => column.getIsVisible());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, settings.columnVisibility]);

  const allColumnsHidden = React.useMemo(() => {
    return columns.every((column) => !column.getIsVisible());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, settings.columnVisibility]);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="ghost"
          role="combobox"
          size="sm"
          className=""
        >
          <Settings2 className="size-4" />
          {t("View")}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder={t("Search columns")} />
          <CommandList>
            <CommandEmpty>{t("No columns found")}</CommandEmpty>
            <CommandGroup>
              {!allColumnsHidden && (
                <CommandItem onSelect={hideAllColumns}>
                  <span className="truncate">{t("Hide all columns")}</span>
                </CommandItem>
              )}
              {!allColumnsVisible && (
                <CommandItem onSelect={showAllColumns}>
                  <span className="truncate">{t("Show all columns")}</span>
                </CommandItem>
              )}
              {columns.map((column) => {
                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() => toggleColumn(column)}
                  >
                    <span className="truncate">
                      {toSentenceCase(
                        // @ts-expect-error column.columnDef.headerName is not typed
                        t(column.columnDef.headerName ?? column.id)
                      )}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto size-4 shrink-0",
                        column.getIsVisible() ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(DataTableViewOptions) as typeof DataTableViewOptions;
