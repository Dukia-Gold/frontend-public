import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import TextHeader from "../../Components/Header/TextHeader";
import Layout2 from "../../Components/Layout2/Layout2";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./SignIn.module.css";
import { Alert } from "@mui/material";

const SignIn = () => {
  const { userLoginInfo, setUserLoginInfo, signInHandler, signInUserObject } =
    useContext(AuthContext);

  // States

  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoginInfo?.email.includes("@") && userLoginInfo?.email) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }

    if (userLoginInfo?.password?.length < 8 && userLoginInfo?.password) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  }, [userLoginInfo.email, userLoginInfo.password]);

  return (
    <Layout2>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader>Sign in to your account</TextHeader>
          {signInUserObject.error && (
            <div className={classes.errorContainer}>
              <Alert severity="error">{signInUserObject.error}</Alert>
            </div>
          )}{" "}
          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                id="email"
                onChange={(e) => {
                  setUserLoginInfo((prevState: any) => {
                    return { ...prevState, email: e.target.value };
                  });
                }}
                value={userLoginInfo.email}
              />
              {!emailIsValid && (
                <span className={classes.warning}>Email is invalid</span>
              )}
            </div>
            <div className={classes.inputSection}>
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setUserLoginInfo((prevState: any) => {
                    return { ...prevState, password: e.target.value };
                  });
                }}
                value={userLoginInfo.password}
              />

              {!passwordIsValid && (
                <span className={classes.warning}>Password is invalid</span>
              )}
            </div>
            <Link to="/forgot-password" className={classes.forgotPassword}>
              Forgot your password?
            </Link>
            <p className={classes.dontHaveAnAccount}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  signInHandler();
                }}
                isLoading={signInUserObject.isLoading}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout2>
  );
};

export default SignIn;
