import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.string,
  props: PropTypes.any,
};
