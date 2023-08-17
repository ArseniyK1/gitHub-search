import styles from "./Input.module.css";

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
