import { Link } from "react-router-dom";
import Button from "../UI/button/Button";

// страница ошибки отображается, если вдруг пользователь зашел не по тому роуту
const ErrorPage = () => {
  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to={"/"}>
          <Button>Go home!</Button>
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
