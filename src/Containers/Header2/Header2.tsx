import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { ProductsContext } from "../../Context/ProductsContext";
import { formatAmountWithCommas2dp } from "../../Utilities/amountToString";
import Cart from "../Cart/Cart";
import classes from "./Header2.module.css";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginCounter from "../../Components/LoginCounter/LoginCounter";

type headerRoutesTypes = {
  title: string;
  route: string | null;
  isActive: boolean | null;
  extraOption:
    | {
        title: string;
        route: string;
      }[]
    | null;
}[];

const Header2 = () => {
  // Context
  const { cart } = useContext(CartContext);
  const { userObject, signOutHandler } = useContext(AuthContext);
  const { askPrices, bidPrices } = useContext(ProductsContext);

  // Navigate
  const navigate = useNavigate();

  const [headerRoutes, setHEaderRoutes] = useState<headerRoutesTypes>([
    {
      title: "Home",
      route: "/",
      extraOption: null,
      isActive: null,
    },

    {
      title: "Buy Gold",
      isActive: false,
      route: null,
      extraOption: [
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
      ],
    },

    {
      title: "About us",
      route: "/about-us",
      extraOption: null,
      isActive: null,
    },

    {
      title: "Guides",
      route: null,
      isActive: false,
      extraOption: [
        // {
        //   title: "How it works",
        //   route: "/how-it-works",
        // },
        {
          title: "Why invest in Gold",
          route: "/why-invest-in-gold",
        },
        {
          title: "Why invest with us",
          route: "/why-invest-with-us",
        },
        {
          title: "FAQs",
          route: "/faqs",
        },
        // {
        //   title: "Downloads",
        //   route: "/downloads",
        // },
      ],
    },
  ]);

  // States
  const [displayOtherOptions, setDisplayOtherOptions] =
    useState<boolean>(false);
  const [displayCart, setDisplayCart] = useState<boolean>(false);
  const [displayUserOptions, setDisplayUserOptions] = useState<boolean>(false);
  const [displayLivePriceDetail, setDisplayLivePriceDetail] =
    useState<boolean>(false);

  // Refs
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const popUpMenuRef2 = useRef<HTMLDivElement | null>(null);
  const popUpMenuRef = useRef<HTMLDivElement | null>(null);

  // Utils
  const openSideMenu = () => {
    if (sideMenu.current) sideMenu.current.style.width = "100%";
  };

  const closeSideMenu = () => {
    if (sideMenu.current) {
      sideMenu.current.style.width = "0%";
    }
  };

  const activeHandler = (i: number) => {
    const headerRoutesCopy = headerRoutes.map((data, index) => {
      if (i === index) {
        return { ...data, isActive: !data.isActive };
      } else {
        return { ...data, isActive: false };
      }
    });

    setHEaderRoutes(headerRoutesCopy);
  };

  // useEffect(() => {
  //   // !popUpMenuRef3?.current?.contains(e.target)

  //   const removeDropdownHandler = (e: any) => {
  //     if (!popUpMenuRef?.current?.contains(e.target)) {
  //       setDisplayOtherOptions(!displayOtherOptions);
  //     } else {
  //       setDisplayOtherOptions(true);
  //     }

  //     if (!popUpMenuRef2?.current?.contains(e.target)) {
  //       setDisplayCart(false);
  //     } else {
  //       setDisplayCart(true);
  //     }
  //   };

  //   document.addEventListener("mousedown", removeDropdownHandler);

  //   return () => {
  //     document.removeEventListener("mousedown", removeDropdownHandler);
  //   };
  // }, [displayCart, displayOtherOptions]);

  return (
    <div className={classes.container}>
      <div className={classes.logoSection}>
        <img
          src="https://res.cloudinary.com/dcu3hr3eo/image/upload/c_scale,w_134/v1686236202/Dukia_Gold_Logo_TRA_cwhx0e.png"
          alt="Dukia Logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className={classes.headerRoutes}>
        {headerRoutes.map((route, i) => {
          if (route.route) {
            return (
              <Link to={route.route} className={classes.route} key={i}>
                {route.title}
              </Link>
            );
          }
          return (
            <div
              className={classes.route}
              key={i}
              onClick={() => {
                activeHandler(i);
              }}
            >
              <p>{route.title}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#fff"
                style={
                  route.isActive
                    ? {
                        transform: "rotate(-45deg)",
                        transition: "all .3s ease-in-out",
                      }
                    : {
                        transform: "rotate(0deg)",
                        transition: "all .3s ease-in-out",
                      }
                }
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
              </svg>
              {route.isActive && (
                <div className={classes.optionsPopup}>
                  {route.extraOption?.map((data, i) => {
                    return (
                      <Link to={data.route} key={i}>
                        {data.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={classes.searchAndLogin}>
        {userObject.data && (
          <div className={classes.loginCOunter}>
            <LoginCounter color="#fff" />
          </div>
        )}

        {userObject.data && (
          <div className={classes.profile}>
            <div className={classes.cart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => {
                  setDisplayCart((prevState: boolean) => {
                    return !prevState;
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                ></path>
              </svg>
              {cart.length > 0 && (
                <div className={classes.cartLengthIndicator}>{cart.length}</div>
              )}
              {displayCart && (
                <div
                  className={classes.cartDropdownContainer}
                  ref={popUpMenuRef2}
                >
                  <Cart popUpRef={popUpMenuRef2} />
                </div>
              )}
            </div>

            <div
              onClick={() => {
                setDisplayUserOptions((prevState) => {
                  return !prevState;
                });
              }}
            >
              <p>
                <span>
                  {`${
                    userObject.data?.first_name.charAt(0).toUpperCase() || ""
                  }${userObject.data?.first_name.slice(1) || ""}`}
                </span>

                {userObject.data?.is_verified && (
                  <svg
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />{" "}
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </svg>
                )}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                style={
                  displayUserOptions
                    ? {
                        transform: "rotate(-45deg)",
                        transition: "all .3s ease-in-out",
                      }
                    : {
                        transform: "rotate(0deg)",
                        transition: "all .3s ease-in-out",
                      }
                }
              >
                <path
                  d="M15 1.35669L7.5 9L-3.341e-07 1.35669L1.33125 8.95484e-07L7.5 6.28662L13.6688 3.56194e-07L15 1.35669Z"
                  fill={userObject.data ? "#fff" : '"#343434"'}
                />
              </svg>
            </div>

            {displayUserOptions && (
              <div className={classes.profileDropdown} ref={popUpMenuRef}>
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                    alt="User"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  />
                  <p>
                    {`${userObject.data?.first_name.charAt(0).toUpperCase()}${
                      userObject.data?.first_name.slice(1) || ""
                    } `}{" "}
                    {`${userObject.data?.last_name.charAt(0).toUpperCase()}${
                      userObject.data?.last_name.slice(1) || ""
                    } `}
                  </p>
                  {userObject.data?.account_number && (
                    <p>Account number | {userObject.data?.account_number}</p>
                  )}
                  <p
                    className={classes.profileDropDownLink}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Account Information
                  </p>
                  <p
                    className={classes.profileDropDownLink}
                    onClick={() => {
                      navigate("/change-password");
                    }}
                  >
                    Change password
                  </p>
                  <p
                    className={classes.profileDropDownLink}
                    onClick={signOutHandler}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {!userObject.data && (
          <>
            <div className={classes.cart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => {
                  setDisplayCart((prevState: boolean) => {
                    return !prevState;
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                ></path>
              </svg>
              {cart.length > 0 && (
                <div className={classes.cartLengthIndicator}>{cart.length}</div>
              )}
              {displayCart && (
                <div
                  className={classes.cartDropdownContainer}
                  ref={popUpMenuRef}
                >
                  <Cart popUpRef={popUpMenuRef2} />
                </div>
              )}
            </div>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                type="secondary"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Get started
              </Button>
            </div>
          </>
        )}
      </div>
      <div className={classes.hamburgerMenu}>
        <div className={classes.mobileCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={() => {
              setDisplayCart((prevState: boolean) => {
                return !prevState;
              });
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            ></path>
          </svg>
          {cart.length > 0 && (
            <div className={classes.cartLengthIndicator}>{cart.length}</div>
          )}
          {displayCart && (
            <div className={classes.cartDropdownContainer} ref={popUpMenuRef}>
              <Cart popUpRef={popUpMenuRef2} />
            </div>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={openSideMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          ></path>
        </svg>
      </div>
      {askPrices && bidPrices && (
        <div className={classes.livePriceUpdate}>
          <div>
            <div
              onClick={() => {
                setDisplayLivePriceDetail((prevState) => !prevState);
              }}
            >
              <FontAwesomeIcon icon={faInfo} />
              {displayLivePriceDetail && (
                <div className={classes.livePriceDetail}>
                  The gold spot prices displayed on our website is obtained from
                  a third-party source and is provided for informational
                  purposes only. <br />
                  It does not represent the price of gold products being traded
                  on our website.
                </div>
              )}
            </div>
            <span>GOLD ASK:</span>
            <span>${formatAmountWithCommas2dp(askPrices?.oz)}/oz</span>
            <span>${formatAmountWithCommas2dp(askPrices?.g)}/g</span>
            <span>${formatAmountWithCommas2dp(askPrices?.kg)}/kg</span>
          </div>
          <div>
            <span>GOLD BID:</span>
            <span>${formatAmountWithCommas2dp(bidPrices?.oz)}/oz</span>
            <span>${formatAmountWithCommas2dp(bidPrices?.g)}/g</span>
            <span>${formatAmountWithCommas2dp(bidPrices?.kg)}/kg</span>
          </div>
        </div>
      )}

      <div className={classes.sideNav} ref={sideMenu}>
        <div className={classes.sideNavInner}>
          <div className={classes.header}>
            <img
              src="https://res.cloudinary.com/dcu3hr3eo/image/upload/c_scale,w_134/v1686236202/Dukia_Gold_Logo_TRA_cwhx0e.png"
              alt="Dukia Logo"
            />

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={classes.mobileCart}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              ></path>
            </svg> */}

            <div className={classes.mobileCart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => {
                  setDisplayCart((prevState: boolean) => {
                    return !prevState;
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                ></path>
              </svg>
              {cart.length > 0 && (
                <div className={classes.cartLengthIndicator}>{cart.length}</div>
              )}
              {displayCart && (
                <div
                  className={classes.cartDropdownContainer}
                  ref={popUpMenuRef}
                >
                  <Cart popUpRef={popUpMenuRef2} />
                </div>
              )}
            </div>

            <button className={classes.btnClose} onClick={closeSideMenu}>
              &times;
            </button>
          </div>
          '
          <div className={classes.sideContainer}>
            <div className={classes.profileAndSearch}></div>
          </div>
          <div className={classes.scontainer}>
            <div className={classes.navBox}>
              {userObject.data && (
                <Link to={"/dashboard"} className={classes.route}>
                  Dashboard
                </Link>
              )}
              {headerRoutes.map((route, i) => {
                if (route.route) {
                  return (
                    <Link to={route.route} className={classes.route} key={i}>
                      {route.title}
                    </Link>
                  );
                }
                return (
                  <div
                    className={classes.routeNew}
                    key={i}
                    onClick={() => {
                      setDisplayOtherOptions((prevState: boolean) => {
                        return !prevState;
                      });
                    }}
                  >
                    <div className={classes.routeInner}>
                      <p>{route.title}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        style={
                          displayOtherOptions
                            ? {
                                transform: "rotate(-90deg)",
                                transition: "all .3s ease-in-out",
                              }
                            : {
                                transform: "rotate(0deg)",
                                transition: "all .3s ease-in-out",
                              }
                        }
                      >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                      </svg>
                    </div>
                    <div
                      className={classes.optionsPopupNew}
                      style={
                        displayOtherOptions
                          ? { maxHeight: "200px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {route.extraOption?.map((data, i) => {
                        return (
                          <Link to={data.route} key={i}>
                            {data.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <Link to={"/dashboard"} className={classes.route}>
                Dashboard
              </Link>
            </div>
            {!userObject?.data ? (
              <>
                <div className={classes.buttonContainer}>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    type="secondary"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Get started
                  </Button>
                </div>
              </>
            ) : (
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  onClick={() => {
                    signOutHandler();
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
