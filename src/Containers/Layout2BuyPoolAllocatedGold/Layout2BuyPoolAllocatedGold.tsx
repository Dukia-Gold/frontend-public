import Header2GoldContainer from "../../Components/Header2GoldContainer/Header2GoldContainer";
import subClasses from "../../Components/ProductsPage/ProductsPage.module.css";
import PoolAllocatedCalculator from "../../Components/PoolAllocatedCalculator/PoolAllocatedCalculator";

const Layout2BuyPoolAllocatedGold = () => {
  return (
    <Header2GoldContainer header="Pool Allocated Gold">
      <div className={subClasses.container}>
        <PoolAllocatedCalculator />
      </div>
    </Header2GoldContainer>
  );
};

export default Layout2BuyPoolAllocatedGold;
