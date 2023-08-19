import GitApiService from "../API/GitApiService";

export const useSort = async (array, sort) => {
  console.log(array);
  const sortedUsers = await Promise.all(
    array.map(async (user) => {
      const repo = await GitApiService.byUserId(user.id);
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
