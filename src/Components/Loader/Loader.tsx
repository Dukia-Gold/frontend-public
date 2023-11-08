import { CircularProgress } from "@mui/material";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <CircularProgress size="3rem" style={{ color: "#1c254e" }} />
    </div>
  );
};

export default Loader;
