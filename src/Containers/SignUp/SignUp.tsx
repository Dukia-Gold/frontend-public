import classes from "../SignIn/SignIn.module.css";
import TextHeader from "../../Components/Header/TextHeader";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout2 from "../../Components/Layout2/Layout2";
import DropdownWithSearch from "../../Components/DropdownWithSearch/DropdownWithSearch";
import { AuthContext } from "../../Context/AuthContext";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import moment from "moment";

const SignUp = () => {
  // Context
  const {
    signUpUser,
    setSignUpUser,
    nationalities,
    signUpHandler,
    signUpUserObject,
    setSignUpUserObject,
    getReferee,
    refereeRequestObject,
  } = useContext(AuthContext);

  // Params
  const { referralCode } = useParams();

  useEffect(() => {
    if (referralCode) {
      getReferee(referralCode);
    }

    // eslint-disable-next-line
  }, [referralCode]);

  // States
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(true);

  const [nationality, setNationality] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [passwordConditions, setPasswordConditions] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialCharacter: false,
    hasOneNumber: false,
    eightCharactersMinimun: false,
  });
  const [passwordInputIsActive, setPasswordInputIsActive] =
    useState<boolean>(false);

  // Effects
  useEffect(() => {
    const selectedNationality = nationalities.data?.find((data) => {
      return data?.en_short_name === nationality;
    })?.alpha_3_code;

    setSignUpUser((prevState) => {
      return { ...prevState, nationality: selectedNationality };
    });

    // eslint-disable-next-line
  }, [nationality]);

  useEffect(() => {
    if (gender)
      setSignUpUser((prevState) => {
        return { ...prevState, gender: gender.toLowerCase() };
      });

    // eslint-disable-next-line
  }, [gender]);

  // Utils
  const currentDate = moment();

  const inValidDate = currentDate.subtract(18, "year").format("YYYY-MM-DD");

  useEffect(() => {
    if (signUpUser.password)
      setPasswordConditions({
        hasLowerCase: /[a-z]/.test(signUpUser.password.trim()),
        hasUpperCase: /[A-Z]/.test(signUpUser.password.trim()),
        hasSpecialCharacter: /[^a-zA-Z0-9\s]/.test(signUpUser.password.trim()),
        hasOneNumber: /\d/.test(signUpUser.password.trim()),
        eightCharactersMinimun: signUpUser.password.trim().length >= 8,
      });
    setPasswordIsValid(
      passwordConditions.eightCharactersMinimun &&
        passwordConditions.hasLowerCase &&
        passwordConditions.hasOneNumber &&
        passwordConditions.hasSpecialCharacter &&
        passwordConditions.hasUpperCase &&
        confirmPasswordIsValid
    );

    // eslint-disable-next-line
  }, [signUpUser.password, signUpUser.password_confirmation]);

  return (
    <Layout2>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <TextHeader paragraph="Register now to start buying gold.">
            Create an Account
          </TextHeader>

          <Snackbar
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(signUpUserObject?.error)}
            onClose={() => {
              setSignUpUserObject((prevState) => {
                return { ...prevState, error: null };
              });
            }}
          >
            <Alert severity="error">{signUpUserObject.error}</Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={6000}
            open={Boolean(signUpUserObject?.data)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="success">
              Check your email to verify your account.
            </Alert>
          </Snackbar>
          <form className={classes.signInForm}>
            <div className={classes.inputSection}>
              <label htmlFor="firstname">First Name*</label>
              <input
                type="text"
                id="firstname"
                value={signUpUser?.first_name}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, first_name: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="middlename">Middle Name (Optional)</label>
              <input
                type="text"
                id="middlename"
                value={signUpUser.middle_name}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, middle_name: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="lastname">Last Name*</label>
              <input
                type="text"
                id="lastname"
                value={signUpUser.last_name}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, last_name: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="Nationality">Nationality*</label>
              <div>
                <DropdownWithSearch
                  title="Nationality"
                  selected={nationality}
                  setSelected={setNationality}
                  options={nationalities.data?.map((data) => {
                    return data.en_short_name;
                  })}
                  isLoading={nationalities.isLoading}
                />
              </div>
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="phone">Phone*</label>
              <input
                type="phone"
                id="phone"
                value={signUpUser.phone}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, phone: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="dob">Date of birth*</label>
              <input
                type="date"
                id="dob"
                max={inValidDate}
                value={signUpUser.birthday}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, birthday: e.target.value };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                id="email"
                value={signUpUser.email}
                onChange={(e) => {
                  if (!e.target.value.includes("@")) {
                    setEmailIsValid(false);
                  } else setEmailIsValid(true);

                  setSignUpUser((prevState) => {
                    return { ...prevState, email: e.target.value };
                  });
                }}
              />
              {!emailIsValid && (
                <span className={classes.warning}>Email is invalid</span>
              )}
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="Gender">Gender*</label>
              <DropdownWithSearch
                title="Gender"
                selected={gender}
                setSelected={setGender}
                options={["Male", "Female"]}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                onFocus={() => {
                  setPasswordInputIsActive(true);
                }}
                onBlur={() => {
                  setPasswordInputIsActive(false);
                }}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, password: e.target.value };
                  });
                }}
                value={signUpUser.password}
              />
            </div>

            {passwordInputIsActive && (
              <div className={classes.passwordRequirements}>
                <p>Password should contain</p>
                <ul>
                  <li
                    className={
                      passwordConditions.hasLowerCase
                        ? classes.validCondition
                        : undefined
                    }
                  >
                    One lowercase letter
                  </li>
                  <li
                    className={
                      passwordConditions.hasUpperCase
                        ? classes.validCondition
                        : undefined
                    }
                  >
                    One uppercase letter
                  </li>
                  <li
                    className={
                      passwordConditions.hasSpecialCharacter
                        ? classes.validCondition
                        : undefined
                    }
                  >
                    One special character
                  </li>
                  <li
                    className={
                      passwordConditions.hasOneNumber
                        ? classes.validCondition
                        : undefined
                    }
                  >
                    One number
                  </li>
                  <li
                    className={
                      passwordConditions.eightCharactersMinimun
                        ? classes.validCondition
                        : undefined
                    }
                  >
                    8 characters minimum
                  </li>
                </ul>
              </div>
            )}

            <div className={classes.inputSection}>
              <label htmlFor="confirmPassword">Confirm password*</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return {
                      ...prevState,
                      password_confirmation: e.target.value,
                    };
                  });
                }}
                onBlur={(e) => {
                  if (e.target.value !== signUpUser.password) {
                    setConfirmPasswordIsValid(false);
                  } else {
                    setConfirmPasswordIsValid(true);
                  }
                }}
                value={signUpUser.password_confirmation}
              />

              {!confirmPasswordIsValid && (
                <span className={classes.warning}>
                  Passwords are not matching
                </span>
              )}
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="referralCode">Referral code (optional)</label>
              <input
                type="text"
                id="referralCode"
                value={signUpUser.referral_code || referralCode}
                onChange={(e) => {
                  setSignUpUser((prevState) => {
                    return { ...prevState, referral_code: e.target.value };
                  });
                }}
              />
            </div>
            <div className={classes.referalUser}>
              {referralCode && refereeRequestObject?.isLoading ? (
                <CircularProgress size="0.8rem" style={{ color: "#1c254d" }} />
              ) : referralCode && refereeRequestObject.data === null ? (
                "No user with this referal code found"
              ) : (
                referralCode &&
                `${refereeRequestObject?.data?.first_name} ${refereeRequestObject?.data?.last_name}`
              )}
            </div>

            <div className={classes.byClicking}>
              By clicking the <b>“Create My Gold Account”</b> button, you agree
              to the Dukia Gold’s{" "}
              <Link to="/terms-and-conditions" target="_blank">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy-statement" target="_blank">
                Privacy Policy
              </Link>
            </div>

            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  signUpHandler();
                }}
                isLoading={signUpUserObject.isLoading}
                disabled={
                  !signUpUser?.first_name ||
                  !signUpUser?.last_name ||
                  !signUpUser?.phone ||
                  !signUpUser?.birthday ||
                  !signUpUser?.email ||
                  !signUpUser?.gender ||
                  !passwordIsValid
                }
              >
                Create My Gold Account
              </Button>
            </div>

            <p className={classes.dontHaveAnAccount}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout2>
  );
};

export default SignUp;
