import Layout from "../../Components/Layout/Layout";
import classes from "../Dashboard/Dashboard.module.css";
import Card from "../../Components/Card/Card";
import { useState } from "react";

const UserPortfolio = () => {
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

  return (
    <Layout title="User Portfolio">
      <div className={classes.container}>
        <div className={classes.cardContainer}>
          <Card>
            <div className={classes.bodyMain}>
              <div className={classes.bodyMainHeader}>
                <h4>Portfolio Balance</h4>
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
      </div>
    </Layout>
  );
};

export default UserPortfolio;
