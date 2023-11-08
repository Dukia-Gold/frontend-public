import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/AuthContext";
import { ProductsContext } from "../../Context/ProductsContext";
import { CartContext } from "../../Context/CartContext";
import Cart from "../Cart/Cart";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import {
  formatAmountWithCommas,
  formatAmountWithCommas2dp,
} from "../../Utilities/amountToString";
import LoginCounter from "../../Components/LoginCounter/LoginCounter";

// Types
type HeaderPropTypes = {
  title: string;
};

const Header = ({ title }: HeaderPropTypes) => {
  // Context
  const { userObject, signOutHandler } = useContext(AuthContext);
  const { askPrices, bidPrices, goldCoinsObject } = useContext(ProductsContext);
  const { cart } = useContext(CartContext);
  const { sideNavItemsState, setSideNavItemsState } =
    useContext(UserPortfolioContext);

  // State
  const [displayUserOptions, setDisplayUserOptions] = useState<boolean>(false);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const [displayCart, setDisplayCart] = useState<boolean>(false);

  // Refs
  const popUpMenuRef = useRef<HTMLDivElement>(null);
  const sideMenu = useRef<HTMLDivElement | null>(null);
  const popUpMenuRef2 = useRef<HTMLDivElement | null>(null);

  // Navigate
  const navigate = useNavigate();

  // Utils
  const openSideMenu = () => {
    if (sideMenu.current) sideMenu.current.style.width = "100%";
  };

  const closeSideMenu = () => {
    if (sideMenu.current) {
      sideMenu.current.style.width = "0%";
    }
  };

  const activeHandler = (index: number) => {
    const sideNavItemsCopy = sideNavItemsState.map((data: any, i: number) => {
      if (i === index && data.otherOptions) {
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
          // otherOptions: { ...data.otherOptions, isActive: false },
        };
      }
    });

    setSideNavItemsState(sideNavItemsCopy);
  };

  const [poolAllocatedPriceState, setPoolAllocatedPriceState] = useState<
    any | undefined
  >();

  useEffect(() => {
    if (goldCoinsObject.data) {
      const poolAllocatedPrice = goldCoinsObject.data?.find((data: any) => {
        return data.type === "pool";
      });
      setPoolAllocatedPriceState(poolAllocatedPrice);
    }
  }, [goldCoinsObject.data]);

  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={openSideMenu}
        className={classes.sideMenuOpener}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        ></path>
      </svg>
      <div className={classes.title}>{title || "Hello User"} </div>
      <LoginCounter />
      <div className={classes.notifications}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 26 29"
          fill="none"
          onClick={() => {
            setDisplayNotifications((prevState) => {
              return !prevState;
            });
          }}
        >
          <path
            d="M25.707 18.2928L23 15.5858V11.9998C22.9969 9.52162 22.075 7.13263 20.4126 5.29477C18.7502 3.4569 16.4654 2.30072 14 2.04979V-0.000213623H12V2.04979C9.53457 2.30072 7.24976 3.4569 5.58737 5.29477C3.92498 7.13263 3.0031 9.52162 3 11.9998V15.5858L0.293 18.2928C0.105451 18.4803 5.66374e-05 18.7346 0 18.9998V21.9998C0 22.265 0.105357 22.5194 0.292893 22.7069C0.48043 22.8944 0.734784 22.9998 1 22.9998H8V23.7768C7.97825 25.0454 8.4254 26.2775 9.25578 27.2368C10.0862 28.1962 11.2414 28.8154 12.5 28.9758C13.1952 29.0447 13.8971 28.9674 14.5606 28.7488C15.2241 28.5302 15.8345 28.1751 16.3525 27.7064C16.8706 27.2377 17.2848 26.6658 17.5685 26.0274C17.8522 25.3891 17.9992 24.6984 18 23.9998V22.9998H25C25.2652 22.9998 25.5196 22.8944 25.7071 22.7069C25.8946 22.5194 26 22.265 26 21.9998V18.9998C25.9999 18.7346 25.8946 18.4803 25.707 18.2928ZM16 23.9998C16 24.7954 15.6839 25.5585 15.1213 26.1211C14.5587 26.6837 13.7956 26.9998 13 26.9998C12.2044 26.9998 11.4413 26.6837 10.8787 26.1211C10.3161 25.5585 10 24.7954 10 23.9998V22.9998H16V23.9998ZM24 20.9998H2V19.4138L4.707 16.7068C4.89455 16.5193 4.99994 16.265 5 15.9998V11.9998C5 9.87805 5.84285 7.84322 7.34315 6.34293C8.84344 4.84264 10.8783 3.99979 13 3.99979C15.1217 3.99979 17.1566 4.84264 18.6569 6.34293C20.1571 7.84322 21 9.87805 21 11.9998V15.9998C21.0001 16.265 21.1054 16.5193 21.293 16.7068L24 19.4138V20.9998Z"
            fill="#343434"
          />
        </svg>
        {displayNotifications && (
          <div className={classes.notifocationsContainer} ref={popUpMenuRef}>
            <p>Notifications</p>
            <div className={classes.notoficationBody}>
              <div>You have no notifications</div>
            </div>

            <div
              className={classes.seeMore}
              onClick={() => {
                navigate("/notifications");
              }}
            >
              See more
            </div>
          </div>
        )}
      </div>
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
          <div className={classes.cartDropdownContainer} ref={popUpMenuRef2}>
            <Cart popUpRef={popUpMenuRef2} />
          </div>
        )}
      </div>
      <div
        className={classes.profile}
        onClick={() => {
          setDisplayUserOptions((prevState) => {
            return !prevState;
          });
        }}
      >
        <p>
          <span>
            {`${userObject.data?.first_name.charAt(0).toUpperCase() || ""}${
              userObject.data?.first_name.slice(1) || ""
            }`}
          </span>

          {userObject.data?.is_verified ? (
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
          ) : null}
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
            fill="#343434"
          />
        </svg>
        {displayUserOptions && (
          <div className={classes.profileDropdown}>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                alt="User"
                onClick={() => navigate("/dashboard")}
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
                onClick={() => navigate("/profile")}
              >
                Account Information
              </p>
              <p
                className={classes.profileDropDownLink}
                onClick={() => navigate("/change-password")}
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
      {userObject.data?.is_verified === 0 && (
        <div className={classes.kycNotificstion}>
          Please complete your KYC verification{" "}
          <Link to="/kyc-verification">HERE</Link>
        </div>
      )}

      {userObject.error && (
        <div className={classes.kycNotificstion}>{userObject.error}</div>
      )}

      {askPrices && bidPrices && (
        <div className={classes.livePriceUpdate}>
          <div>
            <span>POOL ALLOCATED GOLD</span>
            <span>BUY:</span>
            <span>
              &#8358;
              {formatAmountWithCommas2dp(poolAllocatedPriceState?.fetchedPrice)}
              /g
            </span>
            {/* <span>SELL:</span>
            <span>
              &#8358;
              {formatAmountWithCommas(
                poolAllocatedPriceState?.fetchedSellPrice
              )}/g
            </span> */}
          </div>
          <div>
            <span>GOLD HOLDINGS:</span>
            <span>
              {" "}
              {formatAmountWithCommas(userObject.data?.opening_balance_au)}g
            </span>
            <span>CREDIT:</span>
            <span>
              &#8358;
              {formatAmountWithCommas2dp(userObject.data?.opening_balance_ng)}
            </span>
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

            <button className={classes.btnClose} onClick={closeSideMenu}>
              &times;
            </button>
          </div>

          <div className={classes.scontainer}>
            <div className={classes.navBox}>
              <Link to="/" className={classes.route}>
                Home
              </Link>
              {sideNavItemsState.map((route: any, i: number) => {
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
                      activeHandler(i);
                    }}
                  >
                    <div className={classes.routeInner}>
                      <p>{route.title}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#000"
                        style={
                          route.isActive
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
                        route.otherOptions.isActive
                          ? { maxHeight: "200px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {route.otherOptions?.data.map((data: any, i: number) => {
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
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
