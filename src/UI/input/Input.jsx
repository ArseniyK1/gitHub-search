import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = ({ children, inputValue, onChangeInput, ...props }) => {
  return (
    <input
      type="text"
      placeholder={children}
      className={styles["custom-input"]}
      onChange={onChangeInput}
      value={inputValue}
      {...props}
    />
  );
};

export default Input;

Input.propTypes = {
  children: PropTypes.string,
  props: PropTypes.any,
  inputValue: PropTypes.string,
  onChangeInput: PropTypes.func,
};
