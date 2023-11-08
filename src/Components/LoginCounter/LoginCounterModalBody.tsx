import classes from "./LoginCounter.module.css";
import Button from "../Button/Button";
import { signUpUserObjectType } from "../../Context/AuthContext";

type LoginCounterModalBodyProps = {
  onClick: () => void;
  refreshToken: () => void;
  signInUserObject: signUpUserObjectType;
};

const LoginCounterModalBody = ({
  onClick,
  refreshToken,
  signInUserObject,
}: LoginCounterModalBodyProps) => {
  return (
    <div className={classes.modalContainer}>
      <p>Your session will expire soon. Do you want to sign in?</p>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonSection}>
          <div>
            <Button
              type="secondary"
              onClick={() => {
                refreshToken();
                onClick();
              }}
              isLoading={signInUserObject.isLoading}
            >
              Yes
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={onClick}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCounterModalBody;
