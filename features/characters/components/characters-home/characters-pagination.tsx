"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shared/components/ui/pagination";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CharactersPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CharactersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<CharactersPaginationProps>) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage <= 1) return;
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage >= totalPages) return;
    onPageChange(currentPage + 1);
  };

  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationItem>
          <Button
            size="sm"
            onClick={handlePrev}
            type="button"
            variant="ghost"
            disabled={currentPage === 1}
          >
            <ChevronLeft />
            Previous
          </Button>
        </PaginationItem>

        <PaginationItem className="max-w-60 md:max-w-sm overflow-auto flex gap-2 h-fit py-1">
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <Button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                key={pageNumber}
                variant={pageNumber === currentPage ? "default" : "ghost"}
                size="sm"
              >
                {pageNumber}
              </Button>
            );
          })}
        </PaginationItem>

        <PaginationItem>
          <Button
            size="sm"
            onClick={handleNext}
            type="button"
            variant="ghost"
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
