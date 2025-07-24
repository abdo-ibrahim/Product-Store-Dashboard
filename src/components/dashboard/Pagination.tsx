import { Button } from "../ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }

      if (start > 2) {
        pages.push(-1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push(-2);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button variant="outline" className="border-gray-300" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        السابق
      </Button>

      {getPageNumbers().map((page, index) => {
        if (page < 0) {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          );
        }

        return (
          <Button key={page} variant={currentPage === page ? "default" : "outline"} className={`min-w-[40px] ${currentPage === page ? "bg-primary-blue text-white" : "border-gray-300"}`} onClick={() => onPageChange(page)}>
            {page}
          </Button>
        );
      })}

      <Button variant="outline" className="border-gray-300" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        التالي
      </Button>
    </div>
  );
};

export default Pagination;
