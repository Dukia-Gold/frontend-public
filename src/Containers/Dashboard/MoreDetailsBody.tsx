import { capitalize } from "../../Utilities/capitalize";
import Button from "../../Components/Button/Button";
import { formatAmountWithCommas } from "../../Utilities/amountToString";
import classes from "./Dashboard.module.css";

type MoreDetailsBodyType = {
  onClick: () => void;
  data: any;
};

const MoreDetailsBody = ({ onClick, data }: MoreDetailsBodyType) => {
  return (
    <div className={classes.modalContainer}>
      <p>Transaction Details</p>
      <div>
        <span>Transaction Date: </span>
        <span>{data?.created_at}</span>
      </div>
      <div>
        <span>Transaction ID: </span>
        <span>{data?.id}</span>
      </div>
      <div>
        <span>Transaction Type: </span>
        <span>
          {data?.is_pool === "1" ? "Pool Allocated" : "Discrete Bar/Coin"}
        </span>
      </div>
      <div>
        <span>Unit Weight: </span>
        <span>{data?.line_weight}g</span>
      </div>

      <div>
        <span>Quantity: </span>
        <span>{data?.quantity}g</span>
      </div>

      <div>
        <span>Order Weight </span>
        <span>{formatAmountWithCommas(data?.order_weight)}g</span>
      </div>

      <div>
        <span>Order Total </span>
        <span>&#8358;{formatAmountWithCommas(data?.order_total)}</span>
      </div>

      <div>
        <span>Order Status </span>
        <span>{capitalize(data?.status)}</span>
      </div>
      <div>
        <span>Order Type </span>
        <span>{capitalize(data?.type)}</span>
      </div>
      <div className={classes.buttonSection}>
        <div>
          <Button type="secondary">Report Transaction</Button>
        </div>
        <div>
          <Button type="primary" onClick={onClick}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoreDetailsBody;
