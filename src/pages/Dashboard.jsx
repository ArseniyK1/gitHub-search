import Pagination from "@ui/pagination/Pagination";

import "../App.css";

import TaskList from "@components/TaskList";

import TaskService from "@api/TaskService";
import { useSort } from "@hooks/useSort";
import { useFetching } from "@hooks/useFetching";
import { useEffect, useMemo, useState } from "react";
import { getPage } from "@utils/getPaginationData";
import Paginationn from "../components/Paginationn";
import Filters from "../components/Filters";

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

  const sortedArray = useSort(users, sort);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    if (!searchUser) {
      return;
    }
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
    logSortedArray();
  });

  useEffect(() => {
    fetchPosts();
  }, [pagination.page, sort, searchUser]);

  const changePage = (page) => {
    console.log(page);
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sortedAndQueryUsers.slice(startIndex, endIndex));
    setPagination({ ...pagination, page: page });
  };

  const logSortedArray = async () => {
    const sorted = await sortedArray;
    setSortedAndQueryUsers(sorted);
    const startIndex = 0;
    const endIndex = startIndex + pagination.limit;
    setPaginatedUsers(sorted.slice(startIndex, endIndex));
    console.log(
      "Копия массива = ",
      paginatedUsers.map((obj) => obj.login)
    );
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setVisibleMainContent(true);
    fetchPosts();
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
              <TaskList users={paginatedUsers} />
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
