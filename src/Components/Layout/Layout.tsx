import { useEffect, useRef, useState } from "react";
import Header from "../../Containers/Header/Header";
import SideNav from "../../Containers/SideNav/SideNav";
import classes from "./Layout.module.css";

type LayoutPropTypes = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutPropTypes) => {
  // Ref
  const bodyMainRef = useRef<HTMLDivElement>(null);

  // States
  const [bodyIsActive, setBodyIsActive] = useState(true);

  useEffect(() => {
    const removeDropdownHandler = (e: any) => {
      if (!bodyMainRef.current?.contains(e.target)) {
        setBodyIsActive(false);
      } else {
        setBodyIsActive(true);
      }
    };
    document.addEventListener("mouseover", removeDropdownHandler);

    return () => {
      document.removeEventListener("mouseover", removeDropdownHandler);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={classes.sideNav}
        style={bodyIsActive ? { width: "100px" } : { width: "280px" }}
      >
        <SideNav bodyIsActive={bodyIsActive} />
      </div>
      <div className={classes.body} ref={bodyMainRef}>
        <div className={classes.header}>
          <Header title={title} />
        </div>
        <div className={classes.bodyContainer}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
