import Layout2 from "../../Components/Layout2/Layout2";
import { whyInvestInGold } from "../../Utilities/whyInvestInGold";
import WhyInvestContainer from "../WhyInvestContainer/WhyInvestContainer";

const WhyInvestInGold = () => {
  return (
    <Layout2>
      <WhyInvestContainer
        whyInvestInGold={whyInvestInGold}
        header="Why Invest In Gold"
      />
    </Layout2>
  );
};

export default WhyInvestInGold;
