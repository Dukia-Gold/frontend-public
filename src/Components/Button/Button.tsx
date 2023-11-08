import { CircularProgress } from "@mui/material";
import classes from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type: "primary" | string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  type,
  onClick,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={
        type === "primary" || type === "Primary".toLowerCase()
          ? classes.primary
          : classes.secondary
      }
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <CircularProgress size="1rem" color="inherit" /> : children}
    </button>
  );
};

export default Button;
