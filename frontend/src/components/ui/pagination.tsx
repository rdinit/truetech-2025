import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export interface PaginationSearch {
  per_page?: number;
  page_number?: number;
}

interface Props {
  updateSearch: (search: PaginationSearch) => void;
  sizeOptions?: number[];
  rowsCount: number;
  perPage?: number;
  pageNumber?: number;
  className?: string;
  loading?: boolean;
}

export const Pagination = ({
  updateSearch,
  perPage = 10,
  pageNumber = 0,
  sizeOptions = [10, 20, 30, 40, 50],
  rowsCount,
  className,
  loading,
}: Props) => {
  const { t } = useTranslation("common");
  const pageCount = Math.ceil(rowsCount / perPage);

  return (
    <div
      className={cn("flex items-center justify-end px-2 ml-auto", className)}
    >
      <div className="flex items-center md:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            {t("COMMON.PAGINATION.ROWS_COUNT")}
          </p>
          <Select
            value={`${perPage}`}
            onValueChange={(value) => {
              const newPageNumber = Math.floor(pageNumber / Number(value));
              updateSearch({
                per_page: Number(value),
                page_number: newPageNumber,
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {sizeOptions.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  disabled={pageSize > rowsCount && pageSize !== perPage}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-52 items-center justify-center text-sm font-medium pr-6">
          <div
            className={cn(
              "w-6 transition-all",
              loading ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
          >
            <Loader2 className={"size-4 animate-spin mx-auto mr-2"} />
          </div>
          {t("COMMON.PAGINATION.PAGE")} {(pageNumber ?? 0) + 1}{" "}
          {t("COMMON.PAGINATION.OUT_OF")} {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 md:flex"
            onClick={() => updateSearch({ page_number: 0 })}
            disabled={!pageNumber}
          >
            <span className="sr-only">
              {t("COMMON.PAGINATION.GO_TO_FIRST_PAGE")}
            </span>
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => updateSearch({ page_number: pageNumber - 1 })}
            disabled={!pageNumber}
          >
            <span className="sr-only">
              {t("COMMON.PAGINATION.GO_TO_PREVIOUS_PAGE")}
            </span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => updateSearch({ page_number: pageNumber + 1 })}
            disabled={pageNumber >= pageCount - 1}
          >
            <span className="sr-only">
              {t("COMMON.PAGINATION.GO_TO_NEXT_PAGE")}
            </span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 md:flex"
            onClick={() => updateSearch({ page_number: pageCount - 1 })}
            disabled={pageNumber >= pageCount - 1}
          >
            <span className="sr-only">
              {t("COMMON.PAGINATION.GO_TO_LAST_PAGE")}
            </span>
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
