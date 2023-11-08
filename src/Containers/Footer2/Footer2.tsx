import { useNavigate } from "react-router-dom";
import { scrollToTheTop } from "../../Utilities/scrollToTop";
import classes from "./Footer2.module.css";

const Footer2 = () => {
  // Navigation
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.footerTop}>
        <div className={classes.footerItem}>
          <div className={` ${classes.firstHeader}`}>
            <img
              src="https://res.cloudinary.com/dcu3hr3eo/image/upload/c_scale,w_134/v1686236202/Dukia_Gold_Logo_TRA_cwhx0e.png"
              alt="Dukia"
            />
            <div>
              <h6>Dukia Gold</h6>
              <p>Your Precious Metals Refiner &amp; Trusted Bullion Merchant</p>
              <ul className={classes.body}>
                <li>
                  2A, Idowu Olaitan Street, Gbagada Phase 2, Lagos, Nigeria
                </li>
                <li>
                  <a href="mailto:sales@dukiapreciousmetals.co">
                    sales@dukiapreciousmetals.co
                  </a>
                </li>
                <li>
                  <a href="tel:2347033238121">+234 703 323 8121 </a> |{" "}
                  <a href="tell:23439031506699">+234 903 150 6699</a>
                </li>
              </ul>

              <div className={classes.socialIcons}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  fill="currentColor"
                  viewBox="0 0 300 300"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footerItem}>
          <div className={classes.header}>PRODUCTS</div>
          <ul className={classes.body}>
            <li
              onClick={() => {
                navigate("/buy-dukia-gold-bars");
                scrollToTheTop();
              }}
            >
              Gold Bars
            </li>
            <li
              onClick={() => {
                navigate("/buy-dukia-gold-coins");
                scrollToTheTop();
              }}
            >
              Gold Coins
            </li>
            <li
              onClick={() => {
                navigate("/buy-dukia-pool-allocated-gold");
                scrollToTheTop();
              }}
            >
              Pool Allocated Gold
            </li>
          </ul>
        </div>

        <div className={classes.footerItem}>
          <div className={classes.header}>COMPANY</div>
          <ul className={classes.body}>
            <li
              onClick={() => {
                navigate("/about-us");
                scrollToTheTop();
              }}
            >
              About Us
            </li>

            <li
              onClick={() => {
                navigate("/why-invest-with-us");
                scrollToTheTop();
              }}
            >
              Why invest with us
            </li>
          </ul>
        </div>

        <div className={classes.footerItem}>
          <div className={classes.header}>GUIDES</div>
          <ul className={classes.body}>
            <li
              onClick={() => {
                navigate("/why-invest-in-gold");
                scrollToTheTop();
              }}
            >
              Why invest in Gold
            </li>
            <li
              onClick={() => {
                navigate("/faqs");
                scrollToTheTop();
              }}
            >
              FAQs
            </li>
          </ul>
        </div>

        <div className={classes.footerItem}>
          <div className={classes.header}>LEGAL</div>
          <ul className={classes.body}>
            <li
              onClick={() => {
                navigate("/privacy-statement");
                scrollToTheTop();
              }}
            >
              Cookies &amp; Privacy Policy
            </li>
            <li
              onClick={() => {
                navigate("/terms-and-conditions");
                scrollToTheTop();
              }}
            >
              Terms and Conditions
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <div>
          <a href="https://dukiapreciousmetals.co/">
            &copy;2023 Dukia Gold & Precious Metals Refining Co. Ltd (RC
            1564963). . All Rights Reserved.
          </a>
          <p>
            Dukia Gold &amp; Precious Metals Refining Co. Ltd (“Dukia Gold”) is
            fully licensed by the Ministry of Mines and Steel Development to
            Refine, Trade and Export Gold in Nigeria and registered with the
            Special Control Unit Against Money Laundering (SCUML).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
