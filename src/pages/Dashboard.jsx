import React, { useState, useEffect } from "react";
import "../App.css";
import UserList from "@components/UserList";
import Paginationn from "@components/Paginationn";
import Filters from "@components/Filters";
import { useSort } from "@hooks/useSort";
import { getPage } from "@utils/getPaginationData";
import GitApiService from "@api/GitApiService";
import { CircularProgress, LinearProgress } from "@mui/material";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedAndQueryUsers, setSortedAndQueryUsers] = useState([]);
  const [sort, setSort] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [visibleMainContent, setVisibleMainContent] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
    totalPages: 0,
  });
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Состояние для отображения состояния загрузки

  useEffect(() => {
    const delay = 2000;
    let timeoutId;

    const fetchAndSortUsers = async () => {
      try {
        const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
        if (cyrillicPattern.test(searchUser)) {
          alert("Пожалуйста, введите запрос на английском!");
          setLoading(false);
          return;
        }
        setLoading(true);

        if (!searchUser) {
          setLoading(false);
          return;
        }

        const response = await GitApiService.byName(searchUser);
        const usersLoginArr = response.items.filter((obj) =>
          obj.login.includes(searchUser)
        );

        setUsers(usersLoginArr);

        const totalCount = usersLoginArr.length;
        setPagination({
          ...pagination,
          totalPages: getPage(totalCount, pagination.limit),
        });

        const sortedArray = await useSort(usersLoginArr, sort);
        setSortedAndQueryUsers(sortedArray);

        const startIndex = 0;
        const endIndex = startIndex + pagination.limit;
        setPaginatedUsers(sortedArray.slice(startIndex, endIndex));

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchAndSortUsers, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchUser, sort]);

  const changePage = (page) => {
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sortedAndQueryUsers.slice(startIndex, endIndex));
    setPagination({ ...pagination, page: page });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setVisibleMainContent(true);
  };

  const setSortHandler = (event) => {
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

  const changeSearchUserHandler = (event) => {
    setSearchUser(event.target.value);
  };

  return (
    <>
      <div className="main-content">
        <Filters
          searchUser={searchUser}
          changeSearchUserHandler={changeSearchUserHandler}
          submitFormHandler={submitFormHandler}
        />
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
              {loading && (
                <CircularProgress
                  style={{
                    margin: "0 auto",
                    position: "absolute",
                    top: "10px",
                    left: "16vw",
                  }}
                />
                // <div
                //   style={{
                //     margin: "0 auto",
                //     position: "absolute",
                //     top: "10px",
                //     left: "16vw",
                //   }}
                // >
                //   Идет загрузка...
                // </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
