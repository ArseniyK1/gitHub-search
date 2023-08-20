import "../App.css";
import { CircularProgress } from "@mui/material"; // импорты стилей и загрузки из Material UI

import { useState, useEffect } from "react"; // импорты хуков реакта

import UserList from "@components/UserList";
import Paginationn from "@components/Paginationn";
import Filters from "@components/Filters"; // импорты компонентов

import { useSort } from "@hooks/useSort";
import { getPage } from "@utils/getPaginationData";
import GitApiService from "@api/GitApiService"; // импорт вспомогательных сервисов

export default function Dashboard() {
  const [sortedAndQueryUsers, setSortedAndQueryUsers] = useState([]); // состояние для пользователей
  const [sort, setSort] = useState(""); // состояние для сортировки
  const [searchUser, setSearchUser] = useState(""); // состояние для поискового инпута
  const [visibleMainContent, setVisibleMainContent] = useState(false); // состояние для видимого контента
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    totalPages: 0,
  }); // состояние пагинации
  const [paginatedUsers, setPaginatedUsers] = useState([]); // копия массива (нужен для пагинации)
  const [loading, setLoading] = useState(false); // Состояние для отображения состояния загрузки

  useEffect(() => {
    const delay = 2000;
    let timeoutId; // чтобы не перегружать апи, функция fetchAndSortUsers будет вызываться каждые 2 секунды после ввода другого логина в поиске

    const fetchAndSortUsers = async () => {
      try {
        const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
        if (cyrillicPattern.test(searchUser)) {
          alert("Пожалуйста, введите запрос на английском!");
          setLoading(false);
          return;
        } // если пользователь написал логин на русской раскладке - выбрасывается ошибка
        setLoading(true);

        if (!searchUser) {
          setLoading(false);
          return;
        } // если пользователь ничего не ввел в поиск, то выбрасывается ошибка

        const response = await GitApiService.byName(searchUser); // запрос пользователей у апишки
        const usersLoginArr = response.items.filter((obj) =>
          obj.login.includes(searchUser)
        ); // сортируем полученный массив, чтобы совпадение было только по логину

        const totalCount = usersLoginArr.length; // получаем суммарное кол-во пользователей (для пагинации)
        setPagination({
          ...pagination,
          totalPages: getPage(totalCount, pagination.limit),
        }); // обновляем пагинацию

        const sortedArray = await useSort(usersLoginArr, sort); // eslint-disable-line react-hooks/rules-of-hooks
        /* есЛинт ругался, что useSort вызывается внутри не функционального компонента, это правда, но это было бы ошибкой, если бы внутри
        useSort был бы вызов какого-то хука из реакта, но его там нет, поэтому добавил исключение */
        setSortedAndQueryUsers(sortedArray); // обновляем состояние пользователей (отсортированные)

        const startIndex = 0;
        const endIndex = startIndex + pagination.limit;
        setPaginatedUsers(sortedArray.slice(startIndex, endIndex)); // обновляем пагинацию

        setLoading(false); // убираем загрузку
      } catch (error) {
        setLoading(false); // также в случае ошибки убираем отображение загрузки
      }
    };

    clearTimeout(timeoutId); // очищаем счетчик
    timeoutId = setTimeout(fetchAndSortUsers, delay); // отложенный вызов fetchAndSortUsers

    return () => {
      clearTimeout(timeoutId); // очищаем счетчик
    };
  }, [searchUser, sort]); // eslint-disable-line react-hooks/exhaustive-deps
  // здесь также линттер ругался на то (было предупреждение, не ошибка), что в зависимостях нет pagination
  // но при добавлении этой зависимости, неправильно работает пагинация

  const changePage = (page) => {
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sortedAndQueryUsers.slice(startIndex, endIndex));
    setPagination({ ...pagination, page: page });
  }; // ф-ция смены страницы

  const submitFormHandler = (event) => {
    event.preventDefault(); // убираем стандартное поведение браузера (обновление данных происходит без обновления)
    setVisibleMainContent(true); // показываем главный контент
  };

  const setSortHandler = (event) => {
    // обработчик изменения сортировки, если выбрана сортировка, обновляем состояние
    if (event.target.value === "По возрастанию") {
      setSort("По возрастанию");
    }
    if (event.target.value === "По убыванию") {
      setSort("По убыванию");
    }
    if (event.target.value === "Без сортировки") {
      setSort("Без сортировки");
    }
    // если, например, пользователь на 4 странице решил выбрать сортировку "По возрастанию", то он автоматически переходит на 1 страницу
    setPagination({ ...pagination, page: 1 });
  };

  const changeSearchUserHandler = (event) => {
    setSearchUser(event.target.value); // обновление состояния поискового запроса
  };

  return (
    <>
      <div className="main-content">
        <Filters
          searchUser={searchUser}
          changeSearchUserHandler={changeSearchUserHandler}
          submitFormHandler={submitFormHandler}
        />
        {/* если в состоянии visibleMainContent находится true, то отображаем его */}
        {visibleMainContent && (
          <>
            <div className="filters">
              <select className="sort" onChange={setSortHandler}>
                <option value="Без сортировки">Без сортировки</option>
                <option value="По возрастанию">По возрастанию</option>
                <option value="По убыванию">По убыванию</option>
              </select>
            </div>
            <div className="task-lists">
              <UserList users={paginatedUsers} />
              <Paginationn
                totalPages={pagination.totalPages}
                currentPage={pagination.page}
                changePage={changePage}
              />
              {/* если в состоянии loading находится true, то отображаем загрузку */}
              {loading && (
                <CircularProgress
                  style={{
                    margin: "0 auto",
                    position: "absolute",
                    top: "10px",
                    left: "16vw",
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
