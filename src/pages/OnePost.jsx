import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskService from "@api/TaskService";

const OnePost = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchPost = async () => {
    const response = await TaskService.byUserId(id);
    setUser(response.data);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <div className="one-post">
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
              target="_blank"
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
