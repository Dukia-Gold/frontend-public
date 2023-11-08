import { Link } from "react-router-dom";
import Layout2 from "../../Components/Layout2/Layout2";
import classes from "./404Error.module.css";

const PageNotFound = () => {
  return (
    <Layout2>
      <div className={classes.container}>
        <p>
          This page is unavailable, please click <Link to="/">here</Link> to
          return home
        </p>
      </div>
    </Layout2>
  );
};

export default PageNotFound;
