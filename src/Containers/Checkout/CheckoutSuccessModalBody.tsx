import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import classes from "./Checkout.module.css";

type CheckoutSuccessModalBodyType = {
  onClick: () => void;
  data: any;
};

const CheckoutSuccessModalBody = ({
  onClick,
  data,
}: CheckoutSuccessModalBodyType) => {
  // Navigate
  const navigate = useNavigate();

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modalInnerContainer}>
        <i>
          <FontAwesomeIcon icon={faCircleCheck} />
        </i>

        <h4>Order created successfully!</h4>
        <div className={classes.buttonSection}>
          <div>
            <Button
              type="secondary"
              onClick={() => {
                navigate(`/order-confirmed/${data?.ref}`);
              }}
            >
              View Receipt
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={onClick}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessModalBody;
