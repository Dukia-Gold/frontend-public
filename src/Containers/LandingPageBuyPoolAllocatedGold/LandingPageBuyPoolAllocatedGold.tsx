import classes from "./LandingPageBuyPoolAllocatedGold.module.css";
import PoolAllocatedCalculator from "../../Components/PoolAllocatedCalculator/PoolAllocatedCalculator";

const LandingPageBuyPoolAllocatedGold = () => {
  return (
    <div className={classes.container}>
      <div>
        <h5>Buy Pool Allocated Gold</h5>
        <p>
          Our pool allocated gold is a simple and cost-effective way to own
          physical gold of 99.99% purity based on your budget. It allows you to
          own a fractional amount of a 1kg gold bar held securely with Brink's.
          With our pool allocated gold product, you can buy gold based on value
          or weight, offering you control and flexibility on your gold
          investment.
        </p>
      </div>
      <div>
        <PoolAllocatedCalculator />{" "}
      </div>
    </div>
  );
};

export default LandingPageBuyPoolAllocatedGold;
