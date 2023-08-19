import "../App.css"; // Импорт стилей

import UserList from "@components/UserList";
import Paginationn from "@components/Paginationn";
import Filters from "@components/Filters"; // Импорт компонентов

import { useEffect, useMemo, useState } from "react";

import TaskService from "@api/TaskService";
import { useSort, useUsers } from "@hooks/useSort";
import { useFetching } from "@hooks/useFetching";
import { getPage } from "@utils/getPaginationData"; // Импорт кастомных хуков и других сервисов

const Dashboard = () => {
  const [users, setUsers] = useState([]); // Состояние для хранения пользователей
  const [sortedAndQueryUsers, setSortedAndQueryUsers] = useState([]); // Состояние для отсортированных и отфильтрованных пользователей
  const [sort, setSort] = useState(""); // Состояние для выбранного типа сортировки
  const [searchUser, setSearchUser] = useState(""); // Состояние для поискового запроса пользователя
  const [visibleMainContent, setVisibleMainContent] = useState(false); // Состояние видимости основного контента
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    totalPages: 0,
  }); // Состояние для параметров пагинации
  const [paginatedUsers, setPaginatedUsers] = useState([]); // Состояние для отображаемых на странице пользователей

  const sortedArray = useSort(users, sort); // Использование кастомного хука для сортировки пользователей

  // Использование кастомного хука для выполнения запроса к API
  const [fetchUsers] = useFetching(async () => {
    if (!searchUser) {
      return; // если пользователь не ввел поисковой запрос, то выходим из функции
    }
    const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
    if (cyrillicPattern.test(searchUser)) {
      alert("Чтобы найти пользователя введите его логин на английском!");
      return;
    }
    const response = await TaskService.byName(searchUser); // запрашиваем введенного пользователя
    const usersLoginArr = response.items.filter((obj) =>
      obj.login.includes(searchUser)
    ); // снова сортируем полученный JSON, чтобы поиск был только по логину
    setUsers(usersLoginArr); // записываем отсортированных пользователей в состояние
    setSortedAndQueryUsers(usersLoginArr); //  записываем отсортированных пользователей в состояние, для дальнейшей сортировки по возр. и убыв.
    const totalCount = usersLoginArr.length; // вычисляем суммарное количество пользователей
    setPagination({
      ...pagination,
      totalPages: getPage(totalCount, pagination.limit),
    }); // передаем в состояние пагинации максимальное кол-во страниц, вычисленное с помощью нашей функции getPage
    logSortedArray(); // вызов функции для логирования отсортированного массива
  });

  // Эффект, запускающий fetchUsers при изменении параметров пагинации, сортировки или поискового запроса
  useEffect(() => {
    fetchUsers();
  }, [sort]);

  // Функция изменения текущей страницы пагинации
  const changePage = (page) => {
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sortedAndQueryUsers.slice(startIndex, endIndex));
    setPagination({ ...pagination, page: page });
  };

  // Функция для логирования отсортированного массива
  const logSortedArray = async () => {
    const sorted = await sortedArray; // получаем отсортированный массив
    setSortedAndQueryUsers(sorted); // записываем его в состояние
    const startIndex = 0;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sorted.slice(startIndex, endIndex)); // обновляем пагинацию
  };

  // Обработчик отправки формы поиска
  const submitFormHandler = (event) => {
    event.preventDefault(); // убираем стандартное поведение браузера (обновление данных происходит без обновления страницы)
    fetchUsers(); // Вызов fetchUsers для выполнения запроса
    setVisibleMainContent(true); // отображаем основной контент
  };

  // Обработчик изменения типа сортировки
  const setSortHandler = (event) => {
    // в зависимости какой тиа сортировки выбран, его записываем в состояние
    if (event.target.value === "По возрастанию") {
      setSort("По возрастанию");
    }
    if (event.target.value === "По убыванию") {
      setSort("По убыванию");
    }
    if (event.target.value === "Без сортировки") {
      setSort("Без сортировки");
    }
  };

  // Обработчик изменения поискового запроса пользователя
  const changeSearchUserHandler = (event) => {
    setSearchUser(event.target.value);
  };

  return (
    <>
      <div className="main-content">
        {/* Компонент Filters для поиска */}
        <Filters
          searchUser={searchUser}
          changeSearchUserHandler={changeSearchUserHandler}
          submitFormHandler={submitFormHandler}
        />
        {/* Отображение основного контента при видимости */}
        {visibleMainContent && (
          <>
            <div className="filters">
              {/* Выбор типа сортировки */}
              <select className="sort" onChange={setSortHandler}>
                <option value="Без сортировки">Без сортировки</option>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
              </select>
            </div>
            <div className="task-lists">
              {/* Компонент TaskList для отображения списка пользователей */}
              <UserList users={paginatedUsers} />
              {/* Компонент Paginationn для пагинации */}
              <Paginationn
                totalPages={pagination.totalPages}
                currentPage={pagination.page}
                changePage={changePage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
