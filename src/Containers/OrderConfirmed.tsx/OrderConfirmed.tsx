import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import TextHeader from "../../Components/Header/TextHeader";
import Layout2 from "../../Components/Layout2/Layout2";
import { ProductsContext } from "../../Context/ProductsContext";
import { formatAmountWithCommas2dp } from "../../Utilities/amountToString";
import classes from "../KYCVerification/KycVerification.module.css";
import subClasses from "./OrderConfirmed.module.css";

const OrderConfirmed = () => {
  // Context
  const { getPaymentDetailsFromRef, getPaymentDetailsFromRefObject } =
    useContext(ProductsContext);

  // Params
  const { paymentRef } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPaymentDetailsFromRef(paymentRef as string);

    // eslint-disable-next-line
  }, []);

  return (
    <Layout2>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={subClasses.check}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <TextHeader
            paragraph="Thank you for placing your Order. The next step is to process your
              order."
          >
            Order Receipt
          </TextHeader>

          {getPaymentDetailsFromRefObject.isLoading ? (
            <div className={subClasses.loadingCOntainer}>
              <CircularProgress size="1rem" style={{ color: "#1c254e" }} />
            </div>
          ) : (
            <>
              <div className={subClasses.inputSection}>
                <span>Transaction Reference: </span>
                <span>{getPaymentDetailsFromRefObject.data?.data?.ref}</span>
              </div>
              <div className={subClasses.inputSection}>
                <span>Product: </span>
                <span>
                  {getPaymentDetailsFromRefObject.data?.data?.is_pool === "1"
                    ? "Pool Allocated Gold"
                    : "Gold Bars / Gold Coins"}
                </span>
              </div>
              <div className={subClasses.inputSection}>
                <span>Gold Weight: </span>
                <span>
                  {getPaymentDetailsFromRefObject.data?.data?.order_weight}g
                </span>
              </div>
              <div className={subClasses.inputSection}>
                <span>Amount: </span>
                <span>
                  &#8358;
                  {formatAmountWithCommas2dp(
                    getPaymentDetailsFromRefObject.data?.data?.order_total
                  )}
                </span>
              </div>

              <div className={subClasses.inputSection}>
                <span>Date: </span>
                <span>
                  {moment(
                    getPaymentDetailsFromRefObject.data?.data
                      ?.created_at as string
                  ).format("MMMM Do, YYYY")}
                </span>
              </div>
              <div className={subClasses.inputSection}>
                <span>Payment Method: </span>
                <span>Credit</span>
              </div>
              <div className={subClasses.buttonSection}>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/buy-dukia-gold-bars");
                    }}
                  >
                    Continue shopping
                  </Button>
                </div>
                <div>
                  <Button
                    type="secondary"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Go to my dashboard
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout2>
  );
};

export default OrderConfirmed;
