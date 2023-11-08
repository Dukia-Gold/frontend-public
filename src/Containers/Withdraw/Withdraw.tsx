import Layout from "../../Components/Layout/Layout";
import classes from "../KYCVerification/KycVerification.module.css";
import TextHeader from "../../Components/Header/TextHeader";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import { Alert } from "@mui/material";

const Withdraw = () => {
  // Context
  const { userObject } = useContext(AuthContext);
  const {
    withdrawAmount,
    setWithdrawAmount,
    createWithdrawalRequests,
    withdrawRequestObject,
  } = useContext(UserPortfolioContext);

  return (
    <Layout title="Withdraw">
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader>Withdraw</TextHeader>
          <div className={classes.loadingContainer}>
            {withdrawRequestObject.data && (
              <Alert severity="success">{withdrawRequestObject.data}</Alert>
            )}
            {withdrawRequestObject.error && (
              <Alert severity="error">{withdrawRequestObject.error}</Alert>
            )}
          </div>
          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="depositAmount">Withdraw Amount (NGN)</label>
              <input
                type="text"
                id="depositAmount"
                placeholder="50,000"
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(e.target.value);
                }}
              />
            </div>

            <h5> Bank Account Information</h5>

            <div className={classes.inputSection}>
              <label htmlFor="accountName"> Account name</label>
              <input
                type="text"
                id="accountName"
                value={userObject?.data?.bank_account_name as string}
                readOnly
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="accountNumber"> Account number</label>
              <input
                type="text"
                id="accountNumber"
                value={userObject?.data?.bank_account_number as string}
                readOnly
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="bank">Bank</label>
              <input
                type="text"
                id="bank"
                value={userObject?.data?.bank_account_bank_name as string}
                readOnly
              />
            </div>

            <p className={classes.dontHaveAnAccount}>
              Do you want to withdraw to a different bank account contact us{" "}
              <Link to="/"> HERE</Link>
            </p>

            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  createWithdrawalRequests();
                }}
                isLoading={withdrawRequestObject?.isLoading}
                disabled={!withdrawAmount}
              >
                Request Withdrawal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Withdraw;
