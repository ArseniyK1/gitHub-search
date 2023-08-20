import Input from "@ui/input/Input";
import Button from "@ui/button/Button";
import PropTypes from "prop-types";

// компонент вынес в отдельный, чтобы если что его переиспользовать в другом месте на нашем сайте
const Filters = ({
  searchUser,
  changeSearchUserHandler,
  submitFormHandler,
}) => {
  return (
    // получаем поисковой запрос, функцию изменения этого поискового запроса и обработчик отправки формы
    // и передаем это в наши кастомные UI компоненты Input и Button
    <form className="search-user">
      <Input
        inputValue={searchUser}
        onChangeInput={changeSearchUserHandler}
        className="query"
        style={{ width: "350px", height: "50px" }}
      >
        Поиск пользователя...
      </Input>
      <Button
        type="submit"
        style={{ height: "50px" }}
        onClick={submitFormHandler}
      >
        Поиск
      </Button>
    </form>
  );
};

export default Filters;

Filters.propTypes = {
  searchUser: PropTypes.string,
  changeSearchUserHandler: PropTypes.func,
  submitFormHandler: PropTypes.func,
};
