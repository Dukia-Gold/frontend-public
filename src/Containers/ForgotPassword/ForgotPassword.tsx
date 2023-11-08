import { useState } from "react";
import TextHeader from "../../Components/Header/TextHeader";
import classes from "../SignIn/SignIn.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout2 from "../../Components/Layout2/Layout2";

const ForgotPassword = () => {
  // States
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  return (
    <Layout2>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader>Reset Password</TextHeader>
          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                id="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  if (!e.target.value.includes("@")) {
                    setEmailIsValid(false);
                  } else setEmailIsValid(true);
                }}
              />

              {!emailIsValid && (
                <span className={classes.warning}>Email is invalid</span>
              )}
            </div>

            <div className={classes.buttonSection}>
              <Button type="primary">Reset Password</Button>
            </div>

            <p className={classes.dontHaveAnAccount}>
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout2>
  );
};

export default ForgotPassword;
