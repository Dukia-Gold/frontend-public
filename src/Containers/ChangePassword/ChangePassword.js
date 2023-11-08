import { useContext, useEffect, useState } from "react";
import classes from "../KYCVerification/KycVerification.module.css";
import TextHeader from "../../Components/Header/TextHeader";
import Layout from "../../Components/Layout/Layout";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Alert } from "@mui/material";

const ChangePassword = () => {
  // Context
  const {
    changePassword,
    setChangePassword,
    changePasswordHandler,
    changePasswordRequestObject,
  } = useContext(AuthContext);

  // States
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (changePassword.new_password && changePassword.new_password_confirmation)
      if (
        changePassword.new_password === changePassword.new_password_confirmation
      ) {
        setShowError(false);
      } else setShowError(true);
  }, [changePassword]);

  return (
    <Layout title="Change password">
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader>Change password</TextHeader>

          {changePasswordRequestObject.error && (
            <div className={classes.loadingContainer}>
              <Alert severity="error">
                {changePasswordRequestObject.error}
              </Alert>
            </div>
          )}

          {changePasswordRequestObject.data && (
            <div className={classes.loadingContainer}>
              <Alert severity="success">
                {changePasswordRequestObject.data}
              </Alert>
            </div>
          )}

          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="currentPassword">Current password</label>
              <input
                type="password"
                value={changePassword.old_Password}
                onChange={(e) => {
                  setChangePassword((prevState) => {
                    return { ...prevState, old_password: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="newpassword">New password</label>
              <input
                type="password"
                value={changePassword.new_Password}
                onChange={(e) => {
                  setChangePassword((prevState) => {
                    return { ...prevState, new_password: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="confirmNewPassword">Confirm new password</label>
              <input
                type="password"
                value={changePassword.new_password_confirmation}
                onChange={(e) => {
                  setChangePassword((prevState) => {
                    return {
                      ...prevState,
                      new_password_confirmation: e.target.value,
                    };
                  });
                }}
              />
            </div>
            {showError && (
              <div className={classes.warning}>New passswords do not match</div>
            )}

            <p className={classes.dontHaveAnAccount}>
              Click <Link to="/dashboard"> here </Link> to return to dashboard
            </p>

            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  changePasswordHandler();
                }}
                isLoading={changePasswordRequestObject.isLoading}
                disabled={showError}
              >
                Change password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
