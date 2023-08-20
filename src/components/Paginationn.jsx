import PropTypes from "prop-types";

const Paginationn = ({ totalPages, currentPage, changePage }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  // компонент пагинации получает какое кол-во страниц нужно отобразить
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

Paginationn.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  changePage: PropTypes.func,
};
