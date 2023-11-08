import { Link, useLocation } from "react-router-dom";
import classes from "./PreviousLinksTabs.module.css";

type PreviousLinksTypes = { previousLinks: { name: string; route: string }[] };

const PreviousLinksTabs = ({ previousLinks }: PreviousLinksTypes) => {
  // Location
  const location = useLocation();

  return (
    <div className={classes.container}>
      {previousLinks.map((link, i) => {
        return (
          <Link
            key={i}
            to={link.route}
            className={
              location.pathname === link.route.slice(1)
                ? classes.active
                : classes.inactive
            }
          >
            {link.name} {i !== previousLinks.length - 1 && "/ "}
          </Link>
        );
      })}
    </div>
  );
};

export default PreviousLinksTabs;
