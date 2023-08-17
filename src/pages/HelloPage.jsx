import { Link } from "react-router-dom";
import Button from "@ui/button/Button";

const HelloPage = () => {
  return (
    <div className="hello-page">
      <h1>Проект "GitHub search engine"</h1>
      <div className="hello-btn">
        <Link to={"/dashboard"}>
          {" "}
          <Button>Поиск пользователей по имени</Button>
        </Link>
        <Link to={"/byUserId"}>
          {" "}
          <Button>Поиск пользователей по ID</Button>
        </Link>
      </div>
    </div>
  );
};

export default HelloPage;
