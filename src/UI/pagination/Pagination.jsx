import { getPagesArr } from "../../utils/getPaginationData";
import styles from "./Pagination.module.css";

const Paginaton = ({ totalPages, changePage, page }) => {
  let pagesArray = getPagesArr(totalPages);
  return (
    <div className={styles.pagination}>
      {pagesArray.map((p) => (
        <button
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? styles.current : styles.item}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Paginaton;
