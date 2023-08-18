import { useEffect, useState } from "react";
import TaskService from "@api/TaskService";
import Input from "@ui/input/Input";
import Button from "@ui/button/Button";
import { useFetching } from "@hooks/useFetching";

const ByUserIdPage = () => {
  const [inputUser, setInputUser] = useState("");
  const [user, setUser] = useState(null);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const user = await TaskService.byUserId(inputUser);
    setUser(user.data);
    console.log(user.data);
  };

  const changeSearchUserHandler = (event) => {
    setInputUser(event.target.value);
  };

  return (
    <div className="main-content">
      <form className="search-user">
        <Input
          inputValue={inputUser}
          onChangeInput={changeSearchUserHandler}
          className="query"
          style={{ width: "350px", height: "50px" }}
        >
          Поиск по ID...
        </Input>
        <Button
          type="submit"
          style={{ height: "50px" }}
          onClick={submitFormHandler}
        >
          Поиск
        </Button>
      </form>
      {user && (
        <div className="one-post">
          <div className="post-one__body">
            <img src={user.avatar_url} alt="avatar" className="kotik" />
            <h1>
              Идентификатор пользователя:{" "}
              <span style={{ textDecoration: "underline" }}>{user.id}</span>
            </h1>
            <br />
            <span>
              Город пользователя:{" "}
              <span style={{ textDecoration: "underline" }}>
                {user.location}
              </span>
            </span>
            <p>
              Количество репозиториев пользователя:{" "}
              <span style={{ textDecoration: "underline" }}>
                {user.public_repos}
              </span>
            </p>
            <p>
              Ссылка на пользователя:{" "}
              <a
                href={user.html_url}
                style={{ textDecoration: "underline", cursor: "pointer" }}
                target="_blank"
              >
                {user.html_url}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ByUserIdPage;
