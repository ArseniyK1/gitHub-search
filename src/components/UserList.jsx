import styles from "./UserList.module.css";
import UserItem from "./UserItem";
import { useEffect, useState } from "react";
import GitApiService from "@api/GitApiService";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  const [repository, setRepository] = useState([]); // состояние кол-ва репозиториев
  // const [isLoading, setIsLoading] = useState(true); // состояние загрузки

  // функция получения кол-ва репов вызывается каждый раз, когда мы поулчаем новых пользователей
  useEffect(() => {
    async function fetchData() {
      try {
        const repoCounts = []; // результат запишется сюда

        for (let i = 0; i < users.length; i++) {
          const repo = await GitApiService.byUserId(users[i].id);
          repoCounts.push(repo.data.public_repos);
        }

        setRepository(repoCounts); // обновляем состояние
      } catch (error) {
        // console.error("Error fetching repositories:", error.message);
      }
    }
    fetchData();
  }, [users]);

  return (
    <ul className={styles["task-list"]}>
      {/* для каждого пользователя отрисовываем его карточку и передаем пользователя и кол-во репов */}
      {users.map((user, index) => (
        <UserItem user={user} repository={repository[index]} key={user.id} />
      ))}
    </ul>
  );
};

export default UserList;

UserList.propTypes = {
  users: PropTypes.array,
};
