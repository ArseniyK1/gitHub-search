import { Link } from "react-router-dom";
import Button from "../UI/button/Button";
import styles from "./UserItem.module.css";
import PropTypes from "prop-types";

const UserItem = ({ user, repository }) => {
  // получаем пользователя, отображаем у него аватарку, логин, айди и кол-во репов
  return (
    <li className={styles["task-item"]}>
      <div className={styles["task-item__body"]}>
        <h2 className={styles["img-and-name"]}>
          <img src={user.avatar_url} alt="avatar-user" />
          <p>{user.login}</p>
        </h2>
        <p>Айди: {user.id}</p>
        <p>Репозитории: {repository}</p>
      </div>
      {/* при нажатии на кнопку "подробнее" открывается страница с подробной информацией о пользователе */}
      <Link to={`./${user.id}`}>
        <Button>Подробнее</Button>
      </Link>
    </li>
  );
};

export default UserItem;

UserItem.propTypes = {
  user: PropTypes.object,
  repository: PropTypes.number,
};
