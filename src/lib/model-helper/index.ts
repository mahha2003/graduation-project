"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import z from "zod";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { useTableSettings as TableSettingsStore } from "@/components/tanstack-table/store/table-settings-store";

import { validateFilters } from "./validate-filters";

type TableQueryStringParams = {
  page: string;
  pageSize: string;
  sort: string;
  filters: string;
  search: string;
  joinOperator: string;
};

type ApiRequestFunction<in Param, out Result> = (
  param: Param
) => Promise<Result>;
type ParamOverRideFunction<
  ApiParams,
  out OverRideParams extends Partial<ApiParams> = Partial<ApiParams>,
> = (params: {
  ApiParams: TableQueryStringParams;
  TableSettings: {
    pageSize?: number;
    sorting?: {
      id: string;
      desc: boolean;
    }[];
  };
}) => OverRideParams;

type TableNeededData = {
  data: object[];
  totalPages: number;
};

type ModelHelperProps<Param, Result, TableData extends TableNeededData> = {
  tableId: string;
  apiAction: ApiRequestFunction<Param, Result>;
  requestParams?: GetAllParams;
  paramOverRide?: ParamOverRideFunction<Param>;
  extractTableData: (data: { [K in keyof Result]: Result[K] }) => TableData;
};

type tableGetDataParams = {
  page: string | undefined;
  pageSize: string | undefined;
  sort: string | undefined;
  filters: string | undefined;
  search: string | undefined;
  joinOperator: "and" | "or" | undefined;
};

export const ModelHelper = <Param, Result, TableData extends TableNeededData>({
  tableId,
  apiAction,
  paramOverRide,
  extractTableData,
}: ModelHelperProps<Param, Result, TableData>) => {
  const getData = async (enforceParams?: Param) => {
    const searchParams = new URLSearchParams(window.location.search);
    const tableSettings = TableSettingsStore.getState().tables?.[tableId];
    const page = searchParams.get("page") || "1",
      pageSize =
        tableSettings?.pageSize?.toString() ||
        searchParams.get("pagesize") ||
        "10",
      sort = tableSettings?.sorting || searchParams.get("sort") || "",
      filters = searchParams.get("filters") || "",
      search = searchParams.get("search") || "",
      joinOperator = searchParams.get("joinOperator") || "";
    const validFilters = validateFilters(filters);

    const requestParams = {
      page,
      pageSize,
      sort: sort ? JSON.stringify(sort) : "",
      filters: JSON.stringify(validFilters),
      search,
      joinOperator,
    };
    let params: Record<string, unknown> = requestParams;
    if (paramOverRide) {
      params = paramOverRide({
        ApiParams: requestParams,
        TableSettings: {
          pageSize: tableSettings?.pageSize,
          sorting: tableSettings?.sorting,
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredParams: any = Object.fromEntries(
      Object.entries(params).filter(
        ([key, value]) =>
          key &&
          value &&
          !(
            value === "null" ||
            value === "[]" ||
            value === "{}" ||
            value === ""
          )
      )
    );

    // todo fix the typo between pageSize and pagesize from the server
    if (
      filteredParams.pageSize &&
      typeof filteredParams.pageSize === "string"
    ) {
      filteredParams.pagesize = filteredParams.pageSize;
      delete filteredParams.pageSize;
    }

    const response = await apiAction(
      enforceParams ? enforceParams : filteredParams
    );
    return response;
  };

  const initialData: TableData["data"] = [] as TableData["data"];

  const ModelStore = combine(
    {
      data: initialData,
      totalPages: 0,
      loading: false,
      error: "",
      updated_at: new Date("1970-01-01"),
    },
    (set) => ({
      data: initialData,
      getData: async (enforceParams?: Param) => {
        try {
          set({ loading: true });
          const data = await getData(enforceParams);
          const tableData = extractTableData(data);
          set({
            data: tableData.data,
            totalPages: tableData.totalPages,
            loading: false,
            updated_at: new Date(),
          });
          return data;
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
          throw error;
        }
      },
      updateData: (updater: (data: TableData["data"]) => TableData["data"]) => {
        set(({ data }) => ({
          data: updater(data),
        }));
      },
    })
  );

  const useModelStore = create(devtools(immer(ModelStore)));

  const useTableHook = (settings?: {
    enforceParams: (originalParams: tableGetDataParams) => Param;
  }) => {
    const searchParams = useSearchParams();
    const firstRenderRef = useRef(true);
    const lastParams = useRef<Record<string, string | null | undefined>>({});
    const { data, totalPages, loading, getData } = useModelStore(
      useShallow((state) => ({
        data: state.data,
        totalPages: state.totalPages,
        loading: state.loading,
        getData: state.getData,
      }))
    );

    const getCurrentParams = () => {
      const tableSettings = TableSettingsStore.getState().tables?.[tableId];
      return {
        page: searchParams.get("page") ?? undefined,
        pageSize:
          tableSettings?.pageSize?.toString() ??
          searchParams.get("pagesize") ??
          undefined,
        sort: tableSettings?.sorting
          ? JSON.stringify(tableSettings.sorting)
          : (searchParams.get("sort") ?? undefined),
        filters: searchParams.get("filters") ?? undefined,
        search: searchParams.get("search") ?? undefined,
        joinOperator: z
          .enum(["and", "or"])
          .safeParse(searchParams.get("joinOperator")).data,
      };
    };
    useEffect(() => {
      const currentParams = getCurrentParams();
      const changeInParams =
        JSON.stringify(currentParams) !== JSON.stringify(lastParams.current);

      if (changeInParams || firstRenderRef.current) {
        firstRenderRef.current = false;
        lastParams.current = currentParams;
        if (settings?.enforceParams) {
          getData(settings.enforceParams(currentParams));
        } else {
          getData();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, settings?.enforceParams]);

    return {
      data,
      totalPages,
      loading,
      getData: () => {
        if (settings?.enforceParams) {
          return getData(settings.enforceParams(getCurrentParams()));
        } else {
          return getData();
        }
      },
    };
  };
  return {
    useModelStore,
    useTableHook,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferModelHelper<T extends () => { data: any[] }> =
  ReturnType<T>["data"][number];
export default ModelHelper;
