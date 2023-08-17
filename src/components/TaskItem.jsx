import { Link } from "react-router-dom";
import Button from "../UI/button/Button";
import styles from "./TaskItem.module.css";

const TaskItem = ({ user, repository }) => {
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
      <Link to={`./${user.id}`}>
        <Button>Подробнее</Button>
      </Link>
    </li>
  );
};

export default TaskItem;
