import { useState } from "react";
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
          Проект под названием "GitHub search engine". В данном проекте было
          реализовано: роутинг, мемоизация, пагинация, поиск, сортировка и
          разбивка на функциональные и UI компонент. Все права защищены. Что бы
          это ни значило. Удачи!
        </p>
      </div>
    </div>
  );
};

export default SideBar;
