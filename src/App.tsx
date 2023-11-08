import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import AccountInformation from "./Containers/AccountInformation/AccountInformation";
import ChangePassword from "./Containers/ChangePassword/ChangePassword";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Deposit from "./Containers/Deposit/Deposit";
import KycVerification from "./Containers/KYCVerification/KycVerification";
import Notifications from "./Containers/Notifications/Notifications";
import StatementOfAccounts from "./Containers/StatementOfAccounts/StatementOfAccounts";
import Withdraw from "./Containers/Withdraw/Withdraw";
import PageNotFound from "./Containers/404/404Error";
import ForgotPassword from "./Containers/ForgotPassword/ForgotPassword";
import LandingPage from "./Containers/LandingPage/LandingPage";
import ProductsDetailsPage from "./Containers/ProductsDetailsPage/ProductsDetailsPage";
import SignIn from "./Containers/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";
import Checkout from "./Containers/Checkout/Checkout";
import FAQs from "./Containers/FAQs/FAQs";
import AboutUs from "./Containers/AboutUs/AboutUs";
import WhyInvestInGold from "./Containers/WhyInvestInGold/WhyInvestInGold";
import WhyInvestWithUs from "./Containers/WhyInvestWithUs/WhyInvestWithUs";
import UserBuyGold from "./Containers/UserBuyGold/UserBuyGold";
import UserBuyGoldCoins from "./Containers/UserBuyGoldCoins/UserBuyGoldCoins";
import UserBuyPoolALlocatedGold from "./Containers/UserBuyPoolAllocatedGold/UserBuyPoolAllocatedGold";
import Layout2BuyGoldCoin from "./Containers/Layout2BuyGoldCoin/Layout2BuyGoldCoin";
import Layout2BuyGoldBar from "./Containers/Layout2BuyGoldBar/Layout2BuyGoldBar";
import Layout2BuyPoolAllocatedGold from "./Containers/Layout2BuyPoolAllocatedGold/Layout2BuyPoolAllocatedGold";
import OrderConfirmed from "./Containers/OrderConfirmed.tsx/OrderConfirmed";
import PrivacyStatement from "./Containers/PrivacyStatement/PrivacyStatement";
import TermsAndConditions from "./Containers/TermsAndConditions/TermsAndConditions";
import UserPortfolio from "./Containers/UserPortfolio/UserPortfolio";
import EmailConfirmationSuccessful from "./Containers/EmailConfirmationSuccessful/EmailConfirmationSuccessful";
import TransactionHistory from "./Containers/TransactionHistory/TransactionHistory";
import UserTermsAndConditions from "./Containers/TermsAndConditions/UserTermsAndConditions";
import UserPrivacyStatement from "./Containers/PrivacyStatement/UserPrivacyStatement";
import CallUsPage from "./Containers/CallUsPage/CallUsPage";
import EmailUsPage from "./Containers/EmailUsPage/EmailUsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/:referralCode" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dukia-gold/:productId" element={<ProductsDetailsPage />} />
      <Route path="/buy-dukia-gold-coins" element={<Layout2BuyGoldCoin />} />
      <Route path="/buy-dukia-gold-bars" element={<Layout2BuyGoldBar />} />
      <Route
        path="/buy-dukia-pool-allocated-gold"
        element={<Layout2BuyPoolAllocatedGold />}
      />
      <Route path="/privacy-statement" element={<PrivacyStatement />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/why-invest-in-gold" element={<WhyInvestInGold />} />
      <Route path="/why-invest-with-us" element={<WhyInvestWithUs />} />

      {/* Email Verification */}
      <Route
        path="/verify-email/:userId/:token"
        element={<EmailConfirmationSuccessful />}
      />
      <Route path="/call-us" element={<CallUsPage />} />
      <Route path="/email-us" element={<EmailUsPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kyc-verification" element={<KycVerification />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/statement-of-account" element={<StatementOfAccounts />} />
        <Route path="/profile" element={<AccountInformation />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/user/buy-dukia-gold" element={<UserBuyGold />} />
        <Route
          path="/user/buy-pool-allocated-gold"
          element={<UserBuyPoolALlocatedGold />}
        />
        <Route
          path="/order-confirmed/:paymentRef"
          element={<OrderConfirmed />}
        />
        <Route path="/user-portfolio" element={<UserPortfolio />} />

        <Route
          path="/user/buy-dukia-gold-coins"
          element={<UserBuyGoldCoins />}
        />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route
          path="/user/terms-and-conditions"
          element={<UserTermsAndConditions />}
        />
        <Route
          path="/user/privacy-statement"
          element={<UserPrivacyStatement />}
        />
      </Route>
    </Routes>
  );
}

export default App;
