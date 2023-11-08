import Layout from "../../Components/Layout/Layout";
import classes from "../KYCVerification/KycVerification.module.css";
import TextHeader from "../../Components/Header/TextHeader";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import { Alert, Snackbar } from "@mui/material";
import { formatAmountWithCommas } from "../../Utilities/amountToString";

const Deposit = () => {
  const {
    depositAmount,
    setDepositAmount,
    createDepositRequest,
    depositRequestObject,
    setDepositRequestObject,
    receipt,
    setReceipt,
  } = useContext(UserPortfolioContext);

  // State
  const [displayConfirmationAlert, setDisplayNotificationAlert] =
    useState<boolean>(false);
  const [displayReceiptInput, setDisplayReceiptInput] =
    useState<boolean>(false);

  // Utils
  const [paymentType, setPaymentType] = useState([
    { title: "Direct deposit", isActive: true },
    { title: "Paystack", isActive: false },
  ]);

  const paymentActiveChangeHandler = (index: number) => {
    setPaymentType(
      paymentType.map((data, i) => {
        if (index === i) {
          return { ...data, isActive: true };
        } else return { ...data, isActive: false };
      })
    );
  };

  return (
    <Layout title="Deposit">
      <div className={classes.paymentNav}>
        <div className={classes.paymentType}>
          {paymentType.map((data, i) => {
            return (
              <div
                key={data.title}
                className={data.isActive ? classes.active : classes.inActive}
                onClick={() => {
                  paymentActiveChangeHandler(i);
                }}
              >
                {data.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader
            paragraph="Please Indicate your desired deposit amount to receive deposit instructions
"
          >
            Deposit
          </TextHeader>

          <Snackbar
            autoHideDuration={6000}
            open={Boolean(depositRequestObject?.data)}
            onClose={() => {
              setDepositRequestObject((prevState) => {
                return { ...prevState, data: null };
              });
            }}
          >
            <Alert severity="success">{depositRequestObject?.data}</Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={6000}
            open={Boolean(depositRequestObject?.error)}
            onClose={() => {
              setDepositRequestObject((prevState) => {
                return { ...prevState, error: null };
              });
            }}
          >
            <Alert severity="error">{depositRequestObject?.error}</Alert>
          </Snackbar>

          {/* {displayConfirmationAlert && (
            <Alert severity="success">
              Thank you for creating a deposit request. Your deposit will be
              added to your wallet as soon as we receive the cleared funds in
              our account, usually within 24 hours.
            </Alert>
          )} */}

          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="depositAmount">Deposit Amount (NGN)</label>
              <input
                type="number"
                id="depositAmount"
                placeholder="50,000"
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                }}
              />

              <p className={classes.dontHaveAnAccount}>
                Click <Link to="/withdraw"> here </Link> to withdraw instead
              </p>

              <div className={classes.buttonSection}>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // if (depositAmount) createDepositRequest();
                    setDisplayNotificationAlert(true);
                  }}
                  disabled={!depositAmount}
                  isLoading={depositRequestObject.isLoading}
                >
                  Show Dukia Gold account details
                </Button>
              </div>
            </div>
          </form>

          {displayConfirmationAlert && (
            <form className={classes.signInForm}>
              <h5>Dukia Bank Account Information</h5>
              <p>
                Open your Bank App/Internet Banking Platform to Transfer &#8358;
                {formatAmountWithCommas(depositAmount)} to the Dukia Gold
                Account Details Specified Below.
              </p>

              <div className={classes.inputSection}>
                <label htmlFor="bank">Bank</label>
                <input
                  type="text"
                  id="bank"
                  value="UNITED BANK FOR AFRICA PLC"
                  readOnly
                />
              </div>

              <div className={classes.inputSection}>
                <label htmlFor="accountName">Dukia Account name</label>
                <input
                  type="text"
                  id="accountName"
                  value="DUKIA GOLD & PRECIOUS METALS REFINING CO. LTD. - OP"
                  readOnly
                />
              </div>

              <div className={classes.inputSection}>
                <label htmlFor="accountNumber">Dukia Account number</label>
                <input
                  type="text"
                  id="accountNumber"
                  value="1024263390"
                  readOnly
                />
              </div>

              <div className={classes.inputSection}>
                <label htmlFor="type">Type of Account</label>
                <input
                  type="text"
                  id="type"
                  value="OPERATIONS ACCOUNT"
                  readOnly
                />
              </div>

              <div className={classes.inputSection}>
                <label htmlFor="type">Sort Code</label>
                <input type="text" id="type" value="33153788" readOnly />
              </div>

              <div className={classes.inputSection}>
                <label htmlFor="currency">Currency</label>
                <input type="text" id="currency" value="NAIRA" readOnly />
              </div>
              <div className={classes.checkSection}>
                <input
                  type="checkbox"
                  id="iHave"
                  checked={displayReceiptInput}
                  onChange={(e) => {
                    setDisplayReceiptInput(e.target.checked);
                  }}
                />
                <label htmlFor="iHave">I have a receipt</label>
              </div>

              {displayReceiptInput && (
                <div className={classes.fileUpload}>
                  <label htmlFor="receiptUpload">
                    {!receipt?.name ? "Upload Reciept" : receipt?.name}
                  </label>
                  <input
                    type="file"
                    accept=" .pdf,.jpg,.jpeg,.png./*"
                    id="receiptUpload"
                    onChange={(e) => {
                      if (e.target.files) {
                        setReceipt(e.target.files[0]);
                        console.log(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              )}

              <div className={classes.buttonSection}>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayNotificationAlert(true);
                    // setDepositRequestObject({
                    //   error: null,
                    //   data: null,
                    //   isLoading: false,
                    // });
                    if (depositAmount) {
                      createDepositRequest();
                    }
                  }}
                  disabled={!depositAmount}
                  isLoading={depositRequestObject.isLoading}
                >
                  I have transfered the funds
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Deposit;
