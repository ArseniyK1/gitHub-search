import { Link } from "react-router-dom";
import Button from "@ui/button/Button";

// "Приветсвующий" компонент пользователя, на главном экране, также как и на сайдбаре отображаются 2 кнопки - переход на страницу поиска по логина
// или переход на страницу поиска по айди
const HelloPage = () => {
  return (
    <div className="hello-page">
      <h1>Проект &quot;GitHub search engine&quot;</h1>
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
