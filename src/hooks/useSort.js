import { useMemo } from "react";
import TaskService from "@api/TaskService";

export const useSort = (array, sort) => {
  // кастомный хук сортировки
  const sortedUsers = useMemo(async () => {
    // если выбрана сортировка по возрастанию, то заходим в условие
    if (sort === "По возрастанию") {
      let resultArr = []; // создаем результирующий массив (функция sort мутирует изначальный массив, поэтому создаем еще один)
      for (let i = 0; i < array.length; i++) {
        const repo = await TaskService.byUserId(array[i].id); // для каждого юзера вызываем поиск по айди
        resultArr.push(repo.data); // пробегаемся по полученному массиву с пользователями и в результирующий массив добавляем все полученные пользователи
        // в двух слова - делаем копию полученного массива
      }

      return [...resultArr].sort((a, b) => a.public_repos - b.public_repos); // сортируем в порядке возрастания
    }
    if (sort === "По убыванию") {
      // логика сортировки по убыванию отличается от возрастания лишь тем, в порядке сортировки элементов (тут b - a)
      let resultArr = [];
      for (let i = 0; i < array.length; i++) {
        const repo = await TaskService.byUserId(array[i].id); // для каждого юзера вызываем поиск по айди
        resultArr.push(repo.data);
      }

      return [...resultArr].sort((a, b) => b.public_repos - a.public_repos);
    }
    if (sort === "Без сортировки") {
      return array; // если не выбрана сортировка то возвращаем изначальный массив (он сохранился, так как сортировали мы копию)
    }

    return array;
  }, [sort, array]); // функция сортировки вызывается при изменении метода сортировки и массива

  return sortedUsers; // возвращаем отсортированный массив
};
