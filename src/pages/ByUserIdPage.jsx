// Импорт необходимых зависимостей
import { useState } from "react";
import GitApiService from "@api/GitApiService";
import Input from "@ui/input/Input";
import Button from "@ui/button/Button";

// Компонент страницы ByUserIdPage
const ByUserIdPage = () => {
  // Состояние для хранения введенного пользователем значения
  const [inputUser, setInputUser] = useState("");

  // Состояние для хранения информации о пользователе
  const [user, setUser] = useState(null);

  // Состояние для отображения ошибки пользователю
  const [error, setError] = useState(false);

  // Обработчик отправки формы
  const submitFormHandler = async (event) => {
    event.preventDefault(); // Отменить стандартное поведение формы
    const user = await GitApiService.byUserId(inputUser); // Вызов сервиса для получения данных о пользователе
    if (user === "404") {
      setError(true);
      console.log("1111111111111111111111111111111111111111111111111111111");
      return;
    }
    setError(false);
    setUser(user.data); // Установка полученных данных о пользователе в состояние
  };

  // Обработчик изменения значения поля ввода
  const changeSearchUserHandler = (event) => {
    setInputUser(event.target.value); // Установка нового значения в состояние
  };

  return (
    <div className="main-content">
      <form className="search-user">
        {/* Компонент ввода с передачей свойств */}
        <Input
          inputValue={inputUser}
          onChangeInput={changeSearchUserHandler}
          className="query"
          style={{ width: "350px", height: "50px" }}
        >
          Поиск по ID...
        </Input>
        {/* Компонент кнопки для отправки формы */}
        <Button
          type="submit"
          style={{ height: "50px" }}
          onClick={submitFormHandler}
        >
          Поиск
        </Button>
      </form>
      {/* Показ информации о пользователе, если она доступна */}
      {!error ? (
        <>
          {user && (
            <div className="one-post">
              <div className="post-one__body">
                {/* Отображение аватара пользователя */}
                <img src={user.avatar_url} alt="avatar" className="kotik" />
                {/* Отображение идентификатора пользователя */}
                <h1>
                  Идентификатор пользователя:{" "}
                  <span style={{ textDecoration: "underline" }}>{user.id}</span>
                </h1>
                <br />
                {/* Отображение города пользователя */}
                <span>
                  Город пользователя:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {user.location}
                  </span>
                </span>
                {/* Отображение количества репозиториев пользователя */}
                <p>
                  Количество репозиториев пользователя:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {user.public_repos}
                  </span>
                </p>
                {/* Отображение ссылки на профиль пользователя */}
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
            </div>
          )}
        </>
      ) : (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20rem",
            fontSize: "2rem",
            width: "100%",
          }}
        >
          Пользователь не найден!
        </h1>
      )}
    </div>
  );
};

export default ByUserIdPage; // Экспорт компонента ByUserIdPage
