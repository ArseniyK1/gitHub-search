import styles from "./UserList.module.css";
import UserItem from "./UserItem";
import { useEffect, useState } from "react";
import GitApiService from "@api/GitApiService";
import { LinearProgress } from "@mui/material";

const UserList = ({ users }) => {
  const [repository, setRepository] = useState([]); // состояние кол-ва репозиториев
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки

  // функция получение кол-ва репозиториев
  const fetchRepositoryCount = async () => {
    try {
      const repoCounts = []; // результат запишется сюда

      for (let i = 0; i < users.length; i++) {
        const repo = await GitApiService.byUserId(users[i].id);
        // console.log(
        //   "UserList component:  ",
        //   "userId = ",
        //   repo.data.id,
        //   " repos count: ",
        //   repo.data.public_repos
        // );
        repoCounts.push(repo.data.public_repos);
      }

      setRepository(repoCounts); // обновляем состояние
      setIsLoading(false); // Устанавливаем isLoading в false после загрузки данных
    } catch (error) {
      console.error("Error fetching repositories:", error.message);
      setIsLoading(false); // В случае ошибки также устанавливаем isLoading в false
    }
  };

  // функция получения кол-ва репов вызывается каждый раз, когда мы поулчаем новых пользователей
  useEffect(() => {
    fetchRepositoryCount();
  }, [users]);

  if (isLoading) {
    // если загрузка, то ее отображаем
    return (
      <LinearProgress
        color="secondary"
        style={{ margin: "2rem auto", width: "97%" }}
      />
    ); // Добавляем отображение загрузки
  }

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
