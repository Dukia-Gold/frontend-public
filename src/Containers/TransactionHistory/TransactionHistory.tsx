import Layout from "../../Components/Layout/Layout";
import classes from "../Dashboard/Dashboard.module.css";
import { CircularProgress } from "@mui/material";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import { useContext, useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import AcceptedModal from "../../Components/Modals/AcceptedModal/AcceptedModal";
import MoreDetailsBody from "../Dashboard/MoreDetailsBody";
import { capitalize } from "../../Utilities/capitalize";
import { formatAmountWithCommas } from "../../Utilities/amountToString";

const TransactionHistory = () => {
  // Context
  const { userTransactions, getUserTransactions } =
    useContext(UserPortfolioContext);

  // States
  const [showMoereDetailsModal, setSHowMoreDetailsModal] =
    useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<null | {}>(
    null
  );

  // Effects
  useEffect(() => {
    getUserTransactions();

    // eslint-disable-next-line
  }, []);

  //   Utils
  const statusHandler = (status: string): any => {
    if (status === "processed" || status === "fulfilled") {
      return { background: "green" };
    } else if (status === "cancelled") {
      return { background: "red" };
    } else {
      return { background: "#5979be" };
    }
  };

  return (
    <Layout title="Transaction History">
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
                {userTransactions.data?.map((data: any, i: number) => {
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
                          : "Gold Bar/Coin"}
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
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TransactionHistory;
