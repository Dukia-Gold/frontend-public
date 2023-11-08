import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import classes from "./LandingPageHeroSection.module.css";

const LandingPageHeroSection = () => {
  // Navigate
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img
          src="https://res.cloudinary.com/dcu3hr3eo/image/upload/v1685716140/Dukia-Gold-Hero_fokz3g.png"
          alt="Dukia gold"
        />
      </div>
      <div className={classes.textSection}>
        <h4>
          Dukia Gold is the Foremost &amp; Largest Full-Service Bullion Dealer
          in Nigeria, West Africa
        </h4>
        <p>
          Creating ease of access to investment grade gold &amp; other precious
          metals in Nigeria via a safe and secure trading platform
        </p>
        <div className={classes.buttonSection}>
          <div>
            <Button
              type="secondary"
              onClick={() => {
                navigate("/about-us");
              }}
            >
              Learn more
            </Button>
          </div>

          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate("/buy-dukia-gold-bars");
              }}
            >
              Buy Gold
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHeroSection;
