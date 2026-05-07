/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnResizeMode,
  Header,
  HeaderGroup,
  Row,
  type Table as TanstackTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { getCommonPinningStyles } from "../lib/data-table";
import { useTableSettings } from "../store/table-settings-store";
import { ColumnActions } from "./column-actions";
import { DataTablePagination } from "./data-table-pagination";

function SkeletonRows({
  rows = 10,
  columns,
  height,
}: {
  rows?: number;
  columns: number;
  height: string;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell
              key={`skeleton-${rowIndex}-${colIndex}`}
              style={{ height }}
            >
              <Skeleton className="mx-auto h-4 w-[80%] bg-gray-100 dark:bg-gray-500" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>;
  tableId: string;
  isLoading?: boolean;
  isError?: boolean;
  floatingBar?: React.ReactNode | null;
  withToolbar?: boolean;
  columnResizeMode: ColumnResizeMode;
  rowSelection: Record<string, boolean>;
  rowSelectionAll: boolean;
}

const DataRow = memo(
  ({
    id,
    // index,
    isSelected,
    locale,
    cells,
  }: {
    id: string;
    index: number;
    isSelected: boolean;
    locale: string;
    cells: any[];
    columnOrder: string[];
    pinnedCount: number;
  }) => {
    return (
      <tr key={id} data-state={isSelected && "selected"}>
        {cells.map((cell, index) => (
          <td
            key={cell.id}
            style={{
              ...getCommonPinningStyles({
                column: cell.column,
                headerWidth: cell.column.getSize(),
                rowIndex: index,
                locale,
              }),
              padding: "12px",
            }}
            className={cn(
              "border-b border-gray-100 text-center text-sm font-normal dark:border-gray-800",
              {
                "bg-primary-foreground dark:bg-primary":
                  cell.column.getIsPinned(),
              }
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    );
  },
  (prev, next) => {
    return (
      prev.isSelected === next.isSelected &&
      prev.cells.length === next.cells.length &&
      JSON.stringify(prev.columnOrder) === JSON.stringify(next.columnOrder) &&
      prev.pinnedCount === next.pinnedCount
    );
  }
);

DataRow.displayName = "DataRow";

function TableContent<TData>({
  table,
  tableId,
  floatingBar = null,
  // children,
  // className,
  isLoading = false,
  isError = false,
  // withToolbar = false,
  columnResizeMode,
  // rowSelection,
  // rowSelectionAll,
  // ...props
}: DataTableProps<TData>) {
  const locale = useLocale();
  const t = useTranslations("TableConfig");
  const { setColumnOrder: SetColumnOrderForStore } = useTableSettings();

  const settings = useTableSettings((state) => state.tables[tableId]) ?? {
    columnVisibility: {},
    columnPinning: {},
    columnOrder: [],
  };
  const sensors = useSensors(useSensor(PointerSensor));

  const [columnOrder, setColumnOrder] = useState<string[]>(
    table.getAllColumns().map((c) => c.id)
  );

  const columns = useMemo<HeaderGroup<TData>[]>(
    () => table.getHeaderGroups(),
    [
      table,
      settings.columnVisibility,
      settings.columnPinning,
      columnOrder,
      table.getIsAllRowsSelected(),
      table.getState().columnSizingInfo,
      table.getState().columnSizing,
    ]
  );

  const rows = useMemo<Row<TData>[]>(
    () => table.getRowModel().rows,
    [table, table.getRowModel().rows, table.getIsSomeColumnsPinned()]
  );

  const [activeColumn, setActiveColumn] = useState<any>(null);

  const handleDragEnd = useCallback(
    ({ active, over }: any) => {
      if (over && active.id !== over.id) {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
        SetColumnOrderForStore(tableId, newOrder);
      }
      setActiveColumn(null);
    },
    [columnOrder, table]
  );

  const handleMouseDown = useCallback((header: any) => {
    setActiveColumn(header);
  }, []);

  useEffect(() => {
    if (settings.columnOrder.length > 0) {
      setColumnOrder(settings.columnOrder);
      table.setColumnOrder(settings.columnOrder);
    }
  }, [settings.columnOrder, table]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`relative max-w-full overflow-auto ${
          table.getState().pagination.pageSize > 5
            ? "max-h-[70vh]"
            : "max-h-[55vh]"
        }`}
      >
        <table
          className="h-full w-full"
          style={{
            width: table.getTotalSize() > 0 ? table.getTotalSize() : "100%",
            minWidth: "100%",
            tableLayout: "auto",
          }}
        >
          <thead className="sticky top-0 z-20">
            {columns.map((headerGroup) => (
              <TableRow
                className="bg-muted text-base leading-[24.73px] font-medium"
                key={headerGroup.id}
              >
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <SortableHeader
                      key={header.id}
                      header={header}
                      setActiveColumn={handleMouseDown}
                      table={table}
                      columnResizeMode={columnResizeMode}
                      selectedAll={table.getIsAllRowsSelected()}
                      columnSizing={table.getState().columnSizing}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <SkeletonRows
                rows={table.getState().pagination?.pageSize}
                columns={table.getAllColumns().length}
                height={
                  table.getState().pagination?.pageSize > 5 ? "50px" : "40px"
                }
              />
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>
                  <div className="flex items-center justify-center">
                    <p>{t("There is an error")}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : rows?.length ? (
              rows?.map((row, index) => {
                return (
                  <DataRow
                    key={row.id}
                    id={row.id}
                    index={index}
                    locale={locale}
                    isSelected={row.getIsSelected()}
                    cells={row.getVisibleCells()}
                    columnOrder={columnOrder}
                    pinnedCount={
                      table.getAllColumns().filter((c) => c.getIsPinned())
                        .length
                    }
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  {t("NoResults")}
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>

      <DragOverlay>
        {activeColumn ? (
          <div className="animate-float bg-background rounded border px-3 py-1 shadow-lg">
            {flexRender(
              activeColumn.column.columnDef.headerName
                ? activeColumn.column.columnDef.headerName
                : activeColumn.column.columnDef.header,
              activeColumn.getContext()
            )}
          </div>
        ) : null}
      </DragOverlay>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 0.6s ease-in-out infinite;
        }
      `}</style>
    </DndContext>
  );
}

export default TableContent;

const SortableHeader = memo(
  ({
    header,
    table,
    columnResizeMode,
    setActiveColumn,
    // selectedAll,
    columnSizing,
  }: {
    header: Header<any, unknown>;
    table: TanstackTable<any>;
    columnResizeMode: ColumnResizeMode;
    setActiveColumn: (col: any) => void;
    selectedAll: boolean;
    columnSizing: any;
  }) => {
    const locale = useLocale();
    const tableId = "default";
    const settings = useTableSettings((state) => state.tables[tableId]) ?? {
      columnPinning: {},
    };

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: header.id });

    const style = useMemo(
      () => ({
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "4px",
        ...getCommonPinningStyles({
          headerWidth: header.getSize(),
          column: header.column,
          rowIndex: 1,
          locale,
        }),
      }),
      [
        transform,
        transition,
        header.column,
        locale,
        settings.columnPinning,
        columnSizing,
        table.getIsSomeColumnsPinned(),
      ]
    );

    const handleMouseDown = useCallback(() => {
      setActiveColumn(header);
    }, [setActiveColumn, header]);

    const resizeHandlerStyle = useMemo(
      () => ({
        transform:
          columnResizeMode === "onEnd" && header.column.getIsResizing()
            ? `translateX(${
                (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                (table.getState().columnSizingInfo.deltaOffset ?? 0)
              }px)`
            : "",
      }),
      [
        columnResizeMode,
        header.column,
        table.options.columnResizeDirection,
        table.getState().columnSizingInfo.deltaOffset,
      ]
    );

    return (
      <th
        ref={setNodeRef}
        key={header.id}
        colSpan={header.colSpan}
        style={{
          ...style,
          // position: "relative",
        }}
        className={cn("group", {
          "bg-primary-foreground dark:bg-primary": header.column.getIsPinned(),
        })}
      >
        <div className="flex w-auto items-center justify-center gap-2 text-sm font-semibold select-none">
          <span
            {...attributes}
            {...listeners}
            onMouseDown={handleMouseDown}
            className="w-auto cursor-grab rounded p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <GripVertical size={16} />
          </span>
          {header.isPlaceholder
            ? null
            : flexRender(
                header.column.columnDef.headerName
                  ? header.column.columnDef.headerName
                  : header.column.columnDef.header,
                header.getContext()
              )}
          {header.column.getIsSorted() === "asc" && <ArrowUp size={16} />}
          {header.column.getIsSorted() === "desc" && <ArrowDown size={16} />}
          <span className="opacity-0 transition-opacity group-hover:opacity-100">
            <ColumnActions column={header.column} />
          </span>
          {header.column.getCanResize() && (
            <div
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              className={cn(
                "bg-primary-foreground hover:bg-primary-foreground h-[50%] w-1 cursor-col-resize rounded-full transition-all duration-300 hover:w-1",
                "absolute top-1/2 -translate-y-1/2",
                header.column.getIsResizing()
                  ? "bg-primary-foreground"
                  : "bg-white dark:bg-slate-500",
                locale === "ar" ? "left-0" : "right-0"
              )}
              style={resizeHandlerStyle}
            />
          )}
        </div>
      </th>
    );
  }
);

SortableHeader.displayName = "SortableHeader";
