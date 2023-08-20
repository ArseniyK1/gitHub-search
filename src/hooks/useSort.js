// Импорт модуля GitApiService из файла "../API/GitApiService"
import GitApiService from "../API/GitApiService";

// Экспорт функции useSort для сортировки пользователей
export const useSort = async (array, sort) => {
  // Ожидание завершения всех Promise и обработка пользователей
  const sortedUsers = await Promise.all(
    array.map(async (user) => {
      // Запрос информации о репозиториях пользователя через GitApiService
      const repo = await GitApiService.byUserId(user.id);
      // Возвращение объекта с информацией о пользователе и его репозиториях
      return {
        user,
        repo: repo.data,
      };
    })
  );

  // Сортировка пользователей в зависимости от выбранного вида сортировки
  if (sort === "По возрастанию") {
    sortedUsers.sort((a, b) => a.repo.public_repos - b.repo.public_repos);
  } else if (sort === "По убыванию") {
    sortedUsers.sort((a, b) => b.repo.public_repos - a.repo.public_repos);
  }

  // Возвращение отсортированного массива
  return sortedUsers.map((item) => item.user);
};
