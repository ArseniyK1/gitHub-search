import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TaskService from "@api/TaskService";

import { LinearProgress } from "@mui/material";

const TaskList = ({ users }) => {
  const [repository, setRepository] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Добавьте это состояние

  const fetchRepositoryCount = async () => {
    try {
      const repoCounts = [];

      for (let i = 0; i < users.length; i++) {
        const repo = await TaskService.byUserId(users[i].id);
        repoCounts.push(repo.data.public_repos);
      }

      setRepository(repoCounts);
      setIsLoading(false); // Устанавливаем isLoading в false после загрузки данных
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setIsLoading(false); // В случае ошибки также устанавливаем isLoading в false
    }
  };

  useEffect(() => {
    fetchRepositoryCount();
  }, [users]);

  // console.log("repository = ", repository);

  if (isLoading) {
    return (
      <LinearProgress
        color="success"
        style={{ margin: "2rem auto", width: "97%" }}
      />
    ); // Добавляем отображение загрузки
  }

  return (
    <ul className={styles["task-list"]}>
      {users.map((user, index) => (
        <TaskItem user={user} repository={repository[index]} key={user.id} />
      ))}
    </ul>
  );
};

export default TaskList;
