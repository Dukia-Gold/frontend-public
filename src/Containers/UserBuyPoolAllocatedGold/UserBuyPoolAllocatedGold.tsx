import PoolAllocatedCalculator from "../../Components/PoolAllocatedCalculator/PoolAllocatedCalculator";
import UserBuyProductsContainer from "../../Components/UserBuyProductsContainer/UserBuyProductsContainer";
import classes from "./UserBuyPoolAllocatedGold.module.css";

const UserBuyPoolALlocatedGold = () => {
  return (
    <UserBuyProductsContainer header="Pool Allocated Gold">
      <div className={classes.container}>
        <h4>Pool Allocated Gold</h4>
        <PoolAllocatedCalculator />
      </div>
    </UserBuyProductsContainer>
  );
};

export default UserBuyPoolALlocatedGold;
