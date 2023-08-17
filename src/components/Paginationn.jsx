import React from "react";

const Paginationn = ({ totalPages, currentPage, changePage }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "current" : "item"}
          onClick={async () => await changePage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Paginationn;
