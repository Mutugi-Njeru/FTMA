// Pagination.js
import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  filteredData,
  recordsPerPage,
}) => {
  return (
    <div className="px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-600">
            Showing{" "}
            <span className="font-medium">
              {currentPage * recordsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (currentPage + 1) * recordsPerPage,
                filteredData.length
              )}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span>{" "}
            results
          </p>
        </div>
        <div>
          <ReactPaginate
            previousLabel={<ChevronLeft size={16} />}
            nextLabel={<ChevronRight size={16} />}
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="flex items-center space-x-1"
            pageClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            pageLinkClassName="flex items-center justify-center w-full h-full"
            previousClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            previousLinkClassName="flex items-center justify-center w-full h-full"
            nextClassName="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            nextLinkClassName="flex items-center justify-center w-full h-full"
            breakClassName="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-700"
            activeClassName="bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-indigo-100"
            forcePage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
