import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import classes from "./Dashboard.module.css";
import Card from "../../Components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPiggyBank,
  faMoneyBill,
  faMoneyBillTransfer,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import {
  formatAmountWithCommas,
  formatAmountWithCommas2dp,
} from "../../Utilities/amountToString";
import { AuthContext } from "../../Context/AuthContext";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import AcceptedModal from "../../Components/Modals/AcceptedModal/AcceptedModal";
import MoreDetailsBody from "./MoreDetailsBody";
import { capitalize } from "../../Utilities/capitalize";
import Button from "../../Components/Button/Button";

const Dashboard = () => {
  // Context
  const { userObject, getUserDetails } = useContext(AuthContext);
  const { userTransactions, getUserTransactions } =
    useContext(UserPortfolioContext);

  // States
  const [containerStates, setContainerStates] = useState<{
    firstDiv: boolean;
    secondDiv: boolean;
    thirdDiv: boolean;
  }>({
    firstDiv: true,
    secondDiv: true,
    thirdDiv: true,
  });
  const [showMoereDetailsModal, setSHowMoreDetailsModal] =
    useState<boolean>(false);

  // Effects
  useEffect(() => {
    getUserDetails();
    getUserTransactions();

    // eslint-disable-next-line
  }, []);

  const statusHandler = (status: string): any => {
    if (status === "processed" || status === "fulfilled") {
      return { background: "green" };
    } else if (status === "cancelled") {
      return { background: "red" };
    } else {
      return { background: "#5979be" };
    }
  };

  const [selectedTransaction, setSelectedTransaction] = useState<null | {}>(
    null
  );

  // Navigate
  const navigate = useNavigate();

  return (
    <Layout title="Dashboard">
      {showMoereDetailsModal && (
        <AcceptedModal
          onClick={() => {
            setSHowMoreDetailsModal(false);
          }}
          body={
            <MoreDetailsBody
              onClick={() => {
                setSHowMoreDetailsModal(false);
              }}
              data={selectedTransaction as {}}
            />
          }
        />
      )}
      <div className={classes.container}>
        <div className={classes.headerMain}>
          <p>Welcome, {userObject.data?.first_name || "User"}</p>
          {userObject.data?.account_number && (
            <div className={classes.accountNumber}>
              <span>Account Number:</span> {userObject.data?.account_number}
            </div>
          )}
        </div>

        <div className={classes.header}>
          <div className={classes.balance}>
            <div className={classes.dashboardCTAs}>
              <div
                onClick={() => {
                  navigate("/user/buy-pool-allocated-gold");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faSackDollar} />
                </i>

                <p className={classes.holdingsTitle}>Buy/Sell Gold</p>
              </div>

              <div
                onClick={() => {
                  navigate("/deposit");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faMoneyBillTransfer} />
                </i>

                <p className={classes.holdingsTitle}>Deposit/Withdraw</p>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/user-portfolio");
              }}
            >
              <i>
                <FontAwesomeIcon icon={faPiggyBank} />
              </i>

              {userObject.isLoading ? (
                <div className={classes.loadingContainer}>
                  <CircularProgress style={{ color: "inherit" }} size="2rem" />
                </div>
              ) : (
                <>
                  <p>
                    {formatAmountWithCommas(
                      userObject.data?.opening_balance_au
                    )}
                    g
                  </p>
                </>
              )}
              <p className={classes.holdingsTitle}>Gold Holdings</p>
            </div>

            <div>
              <i>
                <FontAwesomeIcon icon={faMoneyBill} />
              </i>

              {userObject.isLoading ? (
                <div className={classes.loadingContainer}>
                  <CircularProgress style={{ color: "inherit" }} size="2rem" />
                </div>
              ) : (
                <>
                  <p>
                    &#8358;{" "}
                    {formatAmountWithCommas2dp(
                      userObject.data?.opening_balance_ng
                    )}
                  </p>
                </>
              )}
              <p className={classes.holdingsTitle}>Credit</p>
            </div>
          </div>
        </div>

        <div className={classes.cardContainer}>
          <Card>
            <div className={classes.bodyMain}>
              <div className={classes.bodyMainHeader}>
                <h4>Gold Holdings</h4>

                {!containerStates.firstDiv &&
                !containerStates.secondDiv &&
                !containerStates.thirdDiv ? (
                  <p
                    onClick={() => {
                      setContainerStates({
                        firstDiv: true,
                        secondDiv: true,
                        thirdDiv: true,
                      });
                    }}
                  >
                    See all information
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      navigate("/user-portfolio");
                    }}
                  >
                    See more information
                  </p>
                )}
              </div>
              <div className={classes.bodyTable}>
                <div className={classes.portfolioRowContainer}>
                  <div
                    className={classes.portfolioRow}
                    onClick={() => {
                      setContainerStates((prevState) => {
                        return {
                          ...prevState,
                          firstDiv: !containerStates.firstDiv,
                        };
                      });
                    }}
                  >
                    <span>Pool Allocated Gold</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="18"
                      viewBox="0 0 10 18"
                      fill="none"
                      style={
                        containerStates.firstDiv
                          ? { transform: "rotate(90deg)" }
                          : { transform: "rotate(0deg)" }
                      }
                    >
                      <path
                        d="M1.25 16.5L8.75 9L1.25 1.5"
                        stroke="#294B8F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={classes.extraInformation}
                    style={
                      containerStates.firstDiv
                        ? { maxHeight: "500px" }
                        : { maxHeight: "0px" }
                    }
                  >
                    <p>
                      <span>Total Holdings</span>: 0
                    </p>
                  </div>
                </div>

                <div className={classes.portfolioRowContainer}>
                  <div
                    className={classes.portfolioRow}
                    onClick={() => {
                      setContainerStates((prevState) => {
                        return {
                          ...prevState,
                          secondDiv: !containerStates.secondDiv,
                        };
                      });
                    }}
                  >
                    <span>Gold bars</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="18"
                      viewBox="0 0 10 18"
                      fill="none"
                      style={
                        containerStates.secondDiv
                          ? { transform: "rotate(90deg)" }
                          : { transform: "rotate(0deg)" }
                      }
                    >
                      <path
                        d="M1.25 16.5L8.75 9L1.25 1.5"
                        stroke="#294B8F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={classes.extraInformation}
                    style={
                      containerStates.secondDiv
                        ? { maxHeight: "500px" }
                        : { maxHeight: "0px" }
                    }
                  >
                    <p>
                      <span>Total Holdings</span>: 0
                    </p>
                  </div>
                </div>

                <div className={classes.portfolioRowContainer}>
                  <div
                    className={classes.portfolioRow}
                    onClick={() => {
                      setContainerStates((prevState) => {
                        return {
                          ...prevState,
                          thirdDiv: !containerStates.thirdDiv,
                        };
                      });
                    }}
                  >
                    <span>Gold coins</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="18"
                      viewBox="0 0 10 18"
                      fill="none"
                      style={
                        containerStates.thirdDiv
                          ? { transform: "rotate(90deg)" }
                          : { transform: "rotate(0deg)" }
                      }
                    >
                      <path
                        d="M1.25 16.5L8.75 9L1.25 1.5"
                        stroke="#294B8F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={classes.extraInformation}
                    style={
                      containerStates.thirdDiv
                        ? { maxHeight: "500px" }
                        : { maxHeight: "0px" }
                    }
                  >
                    {/* <p>
                      <span>Brand</span>: None
                    </p>
                    <p>
                      <span>Weight</span> (Grams): 0g
                    </p> */}
                    <p>
                      <span>Total Holdings</span>: 0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {userTransactions?.data?.length > 0 && (
          <div className={classes.cardContainer}>
            {userTransactions.isLoading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress size="1rem" style={{ color: "#1c254e" }} />
              </div>
            ) : (
              <Card>
                <div className={classes.bodyMainHeader}>
                  <h4>Transaction History</h4>
                </div>
                <div className={classes.tableHeader}>
                  <span>Order ID</span>
                  <span>Type</span>
                  <span>Weight(g)</span>
                  <span>Total</span>
                  <span>Status</span>
                  <span></span>
                </div>
                {userTransactions.data
                  ?.slice(0, 10)
                  ?.map((data: any, i: number) => {
                    return (
                      <div
                        className={classes.tableBody}
                        key={i}
                        onClick={() => {
                          setSHowMoreDetailsModal(true);
                          setSelectedTransaction(data);
                        }}
                      >
                        <span>{data?.id}</span>
                        <span>
                          {data?.is_pool === "1"
                            ? "Pool Allocated Gold"
                            : "Discrete Bar/Coin"}
                        </span>
                        <span>{data?.quantity}</span>
                        <span>
                          &#8358; {formatAmountWithCommas(data?.order_price)}
                        </span>
                        <span>{capitalize(data?.status as string)}</span>
                        <span
                          onClick={() => {
                            setSHowMoreDetailsModal(true);
                            setSelectedTransaction(data);
                          }}
                        >
                          Show details
                        </span>
                        <span
                          className={classes.indicator}
                          style={statusHandler(data?.status)}
                        ></span>
                      </div>
                    );
                  })}
                <div className={classes.buttonSection2}>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/transaction-history");
                    }}
                  >
                    See all transactions
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
