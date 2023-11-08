import classes from "./SideNav.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCartShopping,
  faChartLine,
  faCircleInfo,
  faCoins,
  faGavel,
  faGears,
  faGift,
  faLock,
  faMoneyBill,
  faPiggyBank,
  faUser,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

type SideNavProps = {
  bodyIsActive: boolean;
};

const SideNav = ({ bodyIsActive }: SideNavProps) => {
  // Context
  const { signOutHandler } = useContext(AuthContext);
  const { sideNavItemsState, setSideNavItemsState } =
    useContext(UserPortfolioContext);

  // Location
  const location = useLocation();

  // Navigate
  const navigate = useNavigate();

  const iconHandler = (i: number, title: string) => {
    if (title === "Dashboard") {
      return (
        <i>
          <FontAwesomeIcon icon={faChartLine} />
        </i>
      );
    } else if (title === "Portfolio Balance") {
      return (
        <i>
          <FontAwesomeIcon icon={faCoins} />
        </i>
      );
    } else if (title === "Transaction History") {
      return (
        <i>
          <FontAwesomeIcon icon={faClockRotateLeft} />
        </i>
      );
    } else if (title === "Buy Gold") {
      return (
        <i>
          <FontAwesomeIcon icon={faCartShopping} />
        </i>
      );
    } else if (title === "Gift Gold (coming soon)") {
      return (
        <i>
          <FontAwesomeIcon icon={faGift} />
        </i>
      );
    } else if (title === "Gold Investment Plan (coming soon)") {
      return (
        <i>
          <FontAwesomeIcon icon={faPiggyBank} />
        </i>
      );
    } else if (title === "Deposit/Withdraw") {
      return (
        <i>
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </i>
      );
    } else if (title === "Billings") {
      return (
        <i>
          <FontAwesomeIcon icon={faMoneyBill} />
        </i>
      );
    } else if (title === "Your Account") {
      return (
        <i>
          <FontAwesomeIcon icon={faUser} />
        </i>
      );
    } else if (title === "Security") {
      return (
        <i>
          <FontAwesomeIcon icon={faLock} />
        </i>
      );
    } else if (title === "Get Help") {
      return (
        <i>
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      );
    } else if (title === "Legal") {
      return (
        <i>
          <FontAwesomeIcon icon={faGavel} />
        </i>
      );
    } else if (title === "Settings") {
      return (
        <i>
          <FontAwesomeIcon icon={faGears} />
        </i>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 21"
          fill="none"
        >
          <path
            d="M2.22222 20.5C1.61111 20.5 1.08778 20.2826 0.652222 19.8478C0.217407 19.4122 0 18.8889 0 18.2778V2.72222C0 2.11111 0.217407 1.58778 0.652222 1.15222C1.08778 0.717407 1.61111 0.5 2.22222 0.5H6.66667C7.27778 0.5 7.80111 0.717407 8.23667 1.15222C8.67148 1.58778 8.88889 2.11111 8.88889 2.72222V18.2778C8.88889 18.8889 8.67148 19.4122 8.23667 19.8478C7.80111 20.2826 7.27778 20.5 6.66667 20.5H2.22222ZM13.3333 8.27778C12.7222 8.27778 12.1993 8.06 11.7644 7.62444C11.3289 7.18963 11.1111 6.66667 11.1111 6.05556V2.72222C11.1111 2.11111 11.3289 1.58778 11.7644 1.15222C12.1993 0.717407 12.7222 0.5 13.3333 0.5H17.7778C18.3889 0.5 18.9122 0.717407 19.3478 1.15222C19.7826 1.58778 20 2.11111 20 2.72222V6.05556C20 6.66667 19.7826 7.18963 19.3478 7.62444C18.9122 8.06 18.3889 8.27778 17.7778 8.27778H13.3333ZM13.3333 20.5C12.7222 20.5 12.1993 20.2826 11.7644 19.8478C11.3289 19.4122 11.1111 18.8889 11.1111 18.2778V12.7222C11.1111 12.1111 11.3289 11.5878 11.7644 11.1522C12.1993 10.7174 12.7222 10.5 13.3333 10.5H17.7778C18.3889 10.5 18.9122 10.7174 19.3478 11.1522C19.7826 11.5878 20 12.1111 20 12.7222V18.2778C20 18.8889 19.7826 19.4122 19.3478 19.8478C18.9122 20.2826 18.3889 20.5 17.7778 20.5H13.3333Z"
            fill={
              location.pathname.toLowerCase().includes(title.toLowerCase())
                ? "#32428B"
                : "#1c254e"
            }
          />
        </svg>
      );
    }
  };

  return (
    <div className={classes.container}>
      {!bodyIsActive && (
        <div className={classes.logoSection}>
          <img
            src="https://res.cloudinary.com/dcu3hr3eo/image/upload/c_scale,w_134/v1686236202/Dukia_Gold_Logo_TRA_cwhx0e.png"
            alt="Dukia Logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      )}
      {!bodyIsActive ? (
        <div className={classes.routesSection}>
          {sideNavItemsState.map((navItem, i) => {
            if (navItem.otherOptions && !bodyIsActive) {
              return (
                <>
                  <div
                    className={`${classes.route}`}
                    key={i}
                    onClick={() => {
                      setSideNavItemsState(
                        sideNavItemsState.map((data, j) => {
                          if (data.otherOptions) {
                            if (i === j) {
                              return {
                                ...data,
                                otherOptions: {
                                  ...data.otherOptions,
                                  isActive: !data.otherOptions.isActive,
                                },
                              };
                            } else {
                              return {
                                ...data,
                                otherOptions: {
                                  ...data.otherOptions,
                                  isActive: false,
                                },
                              };
                            }
                          } else {
                            return { ...data };
                          }
                        })
                      );
                    }}
                  >
                    <span>{iconHandler(i, navItem.title)}</span>
                    <span>{navItem.title}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        style={
                          navItem.otherOptions.isActive
                            ? {
                                transform: "rotate(-90deg)",
                                transition: "all 0.3s ease-in-out",
                              }
                            : {
                                transform: "rotate(0deg)",
                                transition: "all 0.3s ease-in-out",
                              }
                        }
                      >
                        <path
                          d="M15 1.35669L7.5 9L-3.341e-07 1.35669L1.33125 8.95484e-07L7.5 6.28662L13.6688 3.56194e-07L15 1.35669Z"
                          fill="#343434"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    className={classes.otherOptions}
                    style={
                      navItem.otherOptions.isActive
                        ? { maxHeight: "200px" }
                        : { maxHeight: "0px" }
                    }
                  >
                    {navItem.otherOptions.data.map((data, j) => {
                      return (
                        <Link
                          to={data.route}
                          key={j}
                          className={`${classes.innerRoute} ${
                            !data.isLive ? classes.inActiveRoute : undefined
                          } ${
                            data.route === location.pathname
                              ? classes.active
                              : undefined
                          }`}
                        >
                          {data.title}
                        </Link>
                      );
                    })}
                  </div>
                </>
              );
            }

            return (
              <Link
                key={i}
                to={navItem?.route as string}
                className={`${classes.route} ${
                  navItem.keywords?.includes(
                    location.pathname.slice(1).toLowerCase()
                  )
                    ? classes.active
                    : null
                } ${!navItem.isActive ? classes.inActiveRoute : null}`}
              >
                <span>{iconHandler(i, navItem.title)}</span>
                <span>{navItem.title}</span>
              </Link>
            );
          })}
          <div className={classes.route} onClick={signOutHandler}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#1c254e"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
                />{" "}
              </svg>
            </span>
            <span>Logout</span>
          </div>
        </div>
      ) : (
        <div className={classes.routesSection}>
          {sideNavItemsState.map((navItem, i) => {
            if (navItem.otherOptions && !bodyIsActive) {
              return (
                <>
                  <div
                    className={`${classes.route}  
                    
                    
                    `}
                    key={i}
                    onClick={() => {
                      setSideNavItemsState(
                        sideNavItemsState.map((data, j) => {
                          if (data.otherOptions) {
                            if (i === j) {
                              return {
                                ...data,
                                otherOptions: {
                                  ...data.otherOptions,
                                  isActive: !data.otherOptions.isActive,
                                },
                              };
                            } else {
                              return {
                                ...data,
                                otherOptions: {
                                  ...data.otherOptions,
                                  isActive: false,
                                },
                              };
                            }
                          } else {
                            return { ...data };
                          }
                        })
                      );
                    }}
                  >
                    <span>{iconHandler(i, navItem.title)}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        style={
                          navItem.otherOptions.isActive
                            ? {
                                transform: "rotate(-90deg)",
                                transition: "all 0.3s ease-in-out",
                              }
                            : {
                                transform: "rotate(0deg)",
                                transition: "all 0.3s ease-in-out",
                              }
                        }
                      >
                        <path
                          d="M15 1.35669L7.5 9L-3.341e-07 1.35669L1.33125 8.95484e-07L7.5 6.28662L13.6688 3.56194e-07L15 1.35669Z"
                          fill="#343434"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    className={classes.otherOptions}
                    style={
                      navItem.otherOptions.isActive
                        ? { maxHeight: "200px" }
                        : { maxHeight: "0px" }
                    }
                  >
                    {navItem.otherOptions.data.map((data, j) => {
                      return (
                        <Link
                          to={data.route}
                          key={j}
                          className={`${classes.innerRoute} ${
                            !data.isLive ? classes.inActiveRoute : undefined
                          } ${
                            data.route === location.pathname
                              ? classes.active
                              : undefined
                          }`}
                        >
                          {data.title}
                        </Link>
                      );
                    })}
                  </div>
                </>
              );
            }

            return (
              <Link
                key={i}
                to={navItem?.route as string}
                className={`${classes.route} ${
                  navItem.keywords?.includes(
                    location.pathname.slice(1).toLowerCase()
                  )
                    ? classes.active
                    : null
                } ${!navItem.isActive ? classes.inActiveRoute : null}`}
              >
                <span>{iconHandler(i, navItem.title)}</span>
              </Link>
            );
          })}
          <div className={classes.route} onClick={signOutHandler}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#1c254e"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
                />{" "}
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;
