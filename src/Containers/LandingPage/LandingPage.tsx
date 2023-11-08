import Layout2 from "../../Components/Layout2/Layout2";
import LandingPageAsFeaturedIn from "../LandingPageAsFeaturedIn/LandingPageAsFeaturedIn";
import LandingPageBuyGold from "../LandingPageBuyGold/LandingPageBuyGold";
import LandingPageBuyPoolAllocatedGold from "../LandingPageBuyPoolAllocatedGold/LandingPageBuyPoolAllocatedGold";
import LandingPageCustomerReviews from "../LandingPageCustomerReviews/LandingPageCustomerReviews";
import LandingPageFAQ from "../LandingPageFAQ/LandingPageFAQ";
import LandingPageGoldBars from "../LandingPageGoldBars/LandingPageGoldBars";
import LandingPageGoldCoins from "../LandingPageGoldCoins/LandingPageGoldCoins";
import LandingPageHeroSection from "../LandingPageHeroSection/LandingPageHeroSection";
import LandingPageSignUpForNewsletter from "../LandingPageSignUpForNewsletter/LandingPageSignUpForNewsletter";
import LandingPageWhyInvest from "../LandingPageWhyInvest/LandingPageWhyInvest";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <Layout2>
      <div className={classes.container}>
        <LandingPageHeroSection />
        <LandingPageBuyGold />
        <LandingPageBuyPoolAllocatedGold />
        <LandingPageGoldBars />
        <LandingPageGoldCoins />
        <LandingPageWhyInvest />
        <LandingPageAsFeaturedIn />
        <LandingPageCustomerReviews />
        <LandingPageFAQ />
        <LandingPageSignUpForNewsletter />
      </div>
    </Layout2>
  );
};

export default LandingPage;
