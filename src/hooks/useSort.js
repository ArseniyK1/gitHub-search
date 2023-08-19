import { useMemo } from "react";
import TaskService from "@api/TaskService";

export const useSort = async (array, sort) => {
  const sortedUsers = await Promise.all(
    array.map(async (user) => {
      const repo = await TaskService.byUserId(user.id);
      return {
        user,
        repo: repo.data,
      };
    })
  );

  if (sort === "По возрастанию") {
    sortedUsers.sort((a, b) => a.repo.public_repos - b.repo.public_repos);
  } else if (sort === "По убыванию") {
    sortedUsers.sort((a, b) => b.repo.public_repos - a.repo.public_repos);
  }

  return sortedUsers.map((item) => item.user);
};
