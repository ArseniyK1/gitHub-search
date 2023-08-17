import { useMemo } from "react";
import TaskService from "@api/TaskService";

export const useSort = (array, sort) => {
  const sortedUsers = useMemo(async () => {
    if (sort === "По возрастанию") {
      let resultArr = [];
      for (let i = 0; i < array.length; i++) {
        const repo = await TaskService.byUserId(array[i].id); // для каждого юзера вызываем поиск по айди
        resultArr.push(repo.data);
      }

      return [...resultArr].sort((a, b) => a.public_repos - b.public_repos);
    }
    if (sort === "По убыванию") {
      let resultArr = [];
      for (let i = 0; i < array.length; i++) {
        const repo = await TaskService.byUserId(array[i].id); // для каждого юзера вызываем поиск по айди
        resultArr.push(repo.data);
      }

      return [...resultArr].sort((a, b) => b.public_repos - a.public_repos);
    }
    if (sort === "Без сортировки") {
      return array;
    }

    return array;
  }, [sort, array]);

  return sortedUsers;
};

export const usePosts = (array, sort, query) => {
  const sortedTasks = useSort(array, sort);

  const searchedAndQueryTasks = useMemo(() => {
    return sortedTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedTasks]);

  return searchedAndQueryTasks;
};
