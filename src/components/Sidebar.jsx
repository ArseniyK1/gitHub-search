import styles from "./SideBar.module.css";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className={styles.menu}>
      <Link to={`/`}>
        <img src="/logo.png" alt="logo" className={styles.logo} />
      </Link>
      <div className={styles["menu-nav"]}>
        <ul className={styles.ul}>
          {/* NavLink нужен, чтобы избавить компонент от громоздкой логики активного нажатия на роуты
           (если мы находимся на странице Dashboard, NavLink в App.css ищет класс active и устанавливает эти стили на кнопку).
           Как только мы переходим на другую страницу, стили активной страницы пропадают */}
          <NavLink to={`dashboard`} className="link-to">
            <li>
              <img
                src="/dashboard.png"
                alt="add"
                className={styles["li-image"]}
              />
              <div> Dashboard</div>
            </li>
          </NavLink>
          <br />
          <NavLink to={`byUserId`} className="link-to">
            <li>
              <img src="/help.png" alt="add" className={styles["li-image"]} />
              <div>ById user</div>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className={styles["menu-footer"]}>
        <p>
          Проект под названием &quot;GitHub search engine&quot;. В данном
          проекте было реализовано: роутинг, пагинация, поиск, сортировка и
          разбивка на функциональные и UI компонент.
        </p>
      </div>
    </div>
  );
};

export default SideBar;
