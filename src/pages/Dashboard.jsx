import "../App.css"; // Импорт стилей

import UserList from "@components/UserList";
import Paginationn from "@components/Paginationn";
import Filters from "@components/Filters"; // Импорт компонентов

import { useEffect, useMemo, useState } from "react";

import TaskService from "@api/TaskService";
import { useSort } from "@hooks/useSort";
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

  // Использование кастомного хука для выполнения запроса к API

  // Эффект, запускающий fetchUsers при изменении параметров пагинации, сортировки или поискового запроса
  useEffect(() => {
    const delay = 2000; // Adjust the delay as needed (in milliseconds)
    let timeoutId;

    const fetchAndSortUsers = async () => {
      try {
        if (!searchUser) {
          return;
        }

        // Fetch users based on the search query
        const response = await TaskService.byName(searchUser);
        const usersLoginArr = response.items.filter((obj) =>
          obj.login.includes(searchUser)
        );

        setUsers(usersLoginArr);
        setSortedAndQueryUsers(usersLoginArr);

        const totalCount = usersLoginArr.length;
        setPagination({
          ...pagination,
          totalPages: getPage(totalCount, pagination.limit),
        });

        // Fetch additional data for each user and then sort
        const sortedArray = await useSort(usersLoginArr, sort);

        const startIndex = 0;
        const endIndex = startIndex + pagination.limit;
        setPaginatedUsers(sortedArray.slice(startIndex, endIndex));
      } catch (error) {
        console.error(error);
      }
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchAndSortUsers, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchUser, sort]);

  // Функция изменения текущей страницы пагинации
  const changePage = (page) => {
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sortedAndQueryUsers.slice(startIndex, endIndex));
    setPagination({ ...pagination, page: page });
  };

  // Обработчик отправки формы поиска
  const submitFormHandler = (event) => {
    event.preventDefault(); // убираем стандартное поведение браузера (обновление данных происходит без обновления страницы)

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
              {/* Компонент UserList для отображения списка пользователей */}
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
