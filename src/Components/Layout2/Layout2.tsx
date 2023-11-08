import Footer2 from "../../Containers/Footer2/Footer2";
import Header2 from "../../Containers/Header2/Header2";
import classes from "./Layout2.module.css";

type LayoutPropsTypes = {
  children: React.ReactNode;
};

const Layout2 = ({ children }: LayoutPropsTypes) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header2 />
      </div>
      <div className={classes.body}> {children}</div>
      <div className={classes.footer}>
        <Footer2 />
      </div>
    </div>
  );
};

export default Layout2;
