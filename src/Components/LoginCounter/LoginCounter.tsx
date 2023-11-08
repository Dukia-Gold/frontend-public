import { CircularProgress } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AcceptedModal from "../Modals/AcceptedModal/AcceptedModal";
import classes from "./LoginCounter.module.css";
import LoginCounterModalBody from "./LoginCounterModalBody";

type LoginCounterProps = {
  color?: string;
};

const LoginCounter = ({ color }: LoginCounterProps) => {
  // Context
  const {
    timeLeft,
    setTimeLeft,
    signOutHandler,
    regenerateUserToken,
    signInUserObject,
  } = useContext(AuthContext);

  //   State
  const [diaplayWarningModal, setDisplayWarningModal] = useState(false);

  useEffect(() => {
    if (timeLeft === 120) {
      setDisplayWarningModal(true);
    }

    if (timeLeft === 60) {
      setDisplayWarningModal(false);
    }

    if (timeLeft === 0 || timeLeft < 0) {
      signOutHandler();
      window.location.reload();
    }

    // eslint-disable-next-line
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }

    // eslint-disable-next-line
  }, [timeLeft]);

  //   console.log(timeLeft);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={classes.container}
      style={{ color }}
      onClick={regenerateUserToken}
    >
      {diaplayWarningModal && (
        <AcceptedModal
          body={
            <LoginCounterModalBody
              onClick={() => {
                setDisplayWarningModal(false);
              }}
              refreshToken={regenerateUserToken}
              signInUserObject={signInUserObject}
            />
          }
          onClick={() => {
            setDisplayWarningModal(false);
          }}
        />
      )}
      <p className={timeLeft < 20 ? classes.warning : undefined}>
        Login Time Left:
      </p>
      {signInUserObject.isLoading ? (
        <CircularProgress size="1rem" style={{ color: "#1c254e" }} />
      ) : (
        <p className={timeLeft < 20 ? classes.warning : undefined}>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export default LoginCounter;
