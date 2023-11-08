import { Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { UserPortfolioContext } from "../../Context/UserPortfolioContext";
import classes from "./LandingPageSignUpForNewsletter.module.css";
import { Link } from "react-router-dom";

const LandingPageSignUpForNewsletter = () => {
  // Context
  const {
    addUserToNewsLetter,
    newsLetterUser,
    setNewsLetterUser,
    newsletterSubscribeObject,
  } = useContext(UserPortfolioContext);

  // States
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (newsLetterUser.email && !newsLetterUser.email.includes("@")) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
  }, [newsLetterUser.email]);

  return (
    <div className={classes.container}>
      <div>
        <h6>Sign up for our newsletter</h6>
        <p>
          Stay updated with the latest gold market trends, news, and insights
        </p>
      </div>
      <div>
        <div className={classes.responseContainer}>
          {newsletterSubscribeObject.data && (
            <Alert severity="success">{newsletterSubscribeObject.data}</Alert>
          )}
          {newsletterSubscribeObject.error && (
            <Alert severity="error">{newsletterSubscribeObject.error}</Alert>
          )}
        </div>

        <input
          type="text"
          placeholder="Firstname"
          value={newsLetterUser?.first_name}
          onChange={(e) => {
            setNewsLetterUser((prevState) => {
              return { ...prevState, first_name: e.target.value };
            });
          }}
          className={classes.input1}
        />
        <input
          type="text"
          placeholder="Lastname"
          value={newsLetterUser?.last_name}
          onChange={(e) => {
            setNewsLetterUser((prevState) => {
              return { ...prevState, last_name: e.target.value };
            });
          }}
          className={classes.input2}
        />
        <input
          type="email"
          placeholder="Email"
          value={newsLetterUser?.email}
          onChange={(e) => {
            setNewsLetterUser((prevState) => {
              return { ...prevState, email: e.target.value };
            });
          }}
          className={classes.input3}
        />
        {!emailIsValid && (
          <div className={classes.warning}>This email is invalid</div>
        )}

        <div className={classes.privacy}>
          <p>We care about the protection of your data.</p>
          <div>
            <input
              type="checkbox"
              id="check"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
              }}
            />
            <label htmlFor="check">
              {" "}
              I have read and agreed with the{" "}
              <Link to="/privacy-statement">Privacy Policy</Link>
            </label>
          </div>
        </div>

        <div className={classes.buttonSection}>
          <Button
            type="primary"
            onClick={addUserToNewsLetter}
            disabled={
              !newsLetterUser.email ||
              !newsLetterUser.first_name ||
              !newsLetterUser.last_name ||
              !agreedToTerms ||
              !emailIsValid
            }
            isLoading={newsletterSubscribeObject.isLoading}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSignUpForNewsletter;
