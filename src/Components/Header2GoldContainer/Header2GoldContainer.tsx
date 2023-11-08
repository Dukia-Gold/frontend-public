import { Link, useLocation } from "react-router-dom";
import TextHeader from "../Header/TextHeader";
import Layout2 from "../Layout2/Layout2";
import classes from "./Header2GoldContainer.module.css";

type Header2GoldContainerType = {
  children: React.ReactNode;
  header: string;
};

const Header2GoldContainer = ({
  children,
  header,
}: Header2GoldContainerType) => {
  //   Utils
  const productsPageNav = [
    {
      title: "Gold Bars",
      route: "/buy-dukia-gold-bars",
    },
    {
      title: "Gold Coins",
      route: "/buy-dukia-gold-coins",
    },
    {
      title: "Pool Allocated Gold",
      route: "/buy-dukia-pool-allocated-gold",
    },
  ];

  //   Location
  const location = useLocation();

  return (
    <Layout2>
      <div className={classes.container}>
        <div className={classes.header}>
          <TextHeader>{header}</TextHeader>
        </div>
        <div className={classes.bodySection}>
          <div className={classes.navSection}>
            {productsPageNav.map((data, i) => {
              return (
                <Link
                  to={data.route}
                  className={
                    location.pathname === data.route
                      ? classes.activeRoute
                      : classes.inactiveRoute
                  }
                >
                  {data.title}
                </Link>
              );
            })}
          </div>
          <div className={classes.body}>{children}</div>
        </div>
      </div>
    </Layout2>
  );
};

export default Header2GoldContainer;
