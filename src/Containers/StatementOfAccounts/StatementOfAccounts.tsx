import Layout from "../../Components/Layout/Layout";
import classes from "../KYCVerification/KycVerification.module.css";
import TextHeader from "../../Components/Header/TextHeader";
import Button from "../../Components/Button/Button";
import moment from "moment";
import { useContext, useEffect } from "react";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import { Alert } from "@mui/material";

const StatementOfAccounts = () => {
  // Context
  const {
    createStatementOfAccountRequest,
    createStatementOfAccountRequestObject,
    setCreateStatementOfAccountRequestObject,
    statementOfAccountDates,
    setStatementOfAccoundDates,
  } = useContext(UserPortfolioContext);

  // Effects
  useEffect(() => {
    setCreateStatementOfAccountRequestObject({
      isLoading: false,
      data: null,
      error: null,
    });

    // eslint-disable-next-line
  }, []);

  const todaysDate = moment().format("YYYY-MM-DD");

  return (
    <Layout title="Statement of Account">
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader>Statement of Account</TextHeader>

          <form className={classes.signInForm}>
            {createStatementOfAccountRequestObject?.data && (
              <Alert severity="success">
                {createStatementOfAccountRequestObject?.data}
              </Alert>
            )}
            {createStatementOfAccountRequestObject?.error && (
              <Alert severity="error">
                {createStatementOfAccountRequestObject?.error}
              </Alert>
            )}

            <div className={classes.inputSection}>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                placeholder="50,000"
                value={statementOfAccountDates?.startDate as string}
                onChange={(e) => {
                  setStatementOfAccoundDates((prevState) => {
                    return { ...prevState, startDate: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                placeholder="50,000"
                max={todaysDate}
                value={statementOfAccountDates?.endDate as string}
                onChange={(e) => {
                  setStatementOfAccoundDates((prevState) => {
                    return { ...prevState, endDate: e.target.value };
                  });
                }}
              />
            </div>
            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    statementOfAccountDates?.startDate &&
                    statementOfAccountDates?.endDate
                  ) {
                    createStatementOfAccountRequest();
                  }
                }}
                isLoading={createStatementOfAccountRequestObject.isLoading}
                disabled={
                  !statementOfAccountDates?.startDate ||
                  !statementOfAccountDates.endDate
                }
              >
                Request Statement of Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StatementOfAccounts;
