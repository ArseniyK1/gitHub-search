import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GitApiService from "@api/GitApiService";

const OnePost = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // получаем пользователя из параметра в ссылке, т.е если http://localhost:5173/dashboard/123, то 123 записывается в id

  // получения пользователя отрабатывает каждый раз как меняется айди
  useEffect(() => {
    async function fetchUser() {
      const response = await GitApiService.byUserId(id); // получения пользователя по айди
      setUser(response.data); // записываем данные пользователя в состояние
    }
    fetchUser();
  }, [id]);

  return (
    <div className="one-post">
      {/* отображаем айди, логин, кол-во репов и ссылку на пользователя на гитхаб */}
      {user && (
        <div className="post-one__body">
          <img src={user.avatar_url} alt="avatar" className="kotik" />
          <h1>
            Идентификатор пользователя:{" "}
            <span style={{ textDecoration: "underline" }}>{id}</span>
          </h1>
          <br />
          <span>
            Никнейм пользователя:{" "}
            <span style={{ textDecoration: "underline" }}>{user.login}</span>
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
              rel="noreferrer"
            >
              {user.html_url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default OnePost;
