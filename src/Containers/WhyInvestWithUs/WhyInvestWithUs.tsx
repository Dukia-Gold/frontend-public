import Layout2 from "../../Components/Layout2/Layout2";
import { whyInvestWithUs } from "../../Utilities/whyInvestInGold";
import WhyInvestContainer from "../WhyInvestContainer/WhyInvestContainer";

const WhyInvestWithUs = () => {
  return (
    <Layout2>
      <WhyInvestContainer
        header=" Why Invest in Gold with us"
        whyInvestInGold={whyInvestWithUs}
      />
    </Layout2>
  );
};

export default WhyInvestWithUs;
