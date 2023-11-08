import { useContext, useEffect } from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useParams } from "react-router-dom";
import Layout2 from "../../Components/Layout2/Layout2";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./EmailConfirmationSuccessful.module.css";

const EmailConfirmationSuccessful = () => {
  // Context
  const { verifyUserEmail } = useContext(AuthContext);

  // PArams
  const { userId, token } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const expires = queryParams.get("expires");
  const signature = queryParams.get("signature");

  useEffect(() => {
    if (userId && token && expires && signature)
      verifyUserEmail(
        userId as string,
        token as string,
        expires as string,
        signature as string
      );

    // eslint-disable-next-line
  }, []);

  return (
    <Layout2>
      <div className={classes.container}>
        <i>
          <FontAwesomeIcon icon={faCircleCheck} />
        </i>
        <h4>Your Email Confirmation was successful</h4>
        <p>
          Click <Link to="/login">here</Link> to return to login to your account
        </p>
      </div>
    </Layout2>
  );
};

export default EmailConfirmationSuccessful;
