import { Dispatch, SetStateAction } from "react";
import classes from "./SectionsNav.module.css";

type SectionsNavTypes = {
  navItems: {
    title: string;
    isActive: boolean;
  }[];
  setNavItems: Dispatch<SetStateAction<{ title: string; isActive: boolean }[]>>;
  style?: React.CSSProperties;
};

const SectionsNav = ({ navItems, setNavItems, style }: SectionsNavTypes) => {
  // utils
  const activeChangeHandler = (index: number) => {
    const navCopy = [...navItems].map((datum, i) => {
      if (i === index) {
        return {
          ...datum,
          isActive: true,
        };
      }

      return {
        ...datum,
        isActive: false,
      };
    });
    setNavItems(navCopy);
  };

  return (
    <div className={classes.container}>
      <div className={classes.listNav}>
        {navItems.map((data, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                activeChangeHandler(i);
              }}
              className={
                data.isActive ? `${classes.activeDiv}` : `${classes.div}`
              }
              style={style}
            >
              <span>{data.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsNav;
