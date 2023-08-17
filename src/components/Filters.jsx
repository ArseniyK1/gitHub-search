import Input from "@ui/input/Input";
import Button from "@ui/button/Button";

const Filters = ({
  searchUser,
  changeSearchUserHandler,
  submitFormHandler,
}) => {
  return (
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
