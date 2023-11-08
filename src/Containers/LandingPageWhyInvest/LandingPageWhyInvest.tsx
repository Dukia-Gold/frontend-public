import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import classes from "./LandingPageWhyInvest.module.css";

type whyInvestWithDukiaTyoe = {
  image: string;
  header: string;
  content: string;
}[];

const LandingPageWhyInvest = () => {
  // Router
  const navigate = useNavigate();

  const whyInvestWithDukia: whyInvestWithDukiaTyoe = [
    {
      image:
        "https://res.cloudinary.com/dcu3hr3eo/image/upload/h_400,c_scale/v1690556450/dukia-asset-01/undraw_preferences_popup_re_4qk0.svg",
      header: "A trustworthy brand",
      content:
        "Buy gold from a trustable products provider that is fully licensed as a bullion merchant in Nigeria and operates in line with the best standards and practices in adherence to all local and international regulations.",
    },
    {
      image:
        "https://res.cloudinary.com/dcu3hr3eo/image/upload/h_400,c_scale/v1690556682/dukia-asset-01/undraw_judge_katerina_limpitsouni_ny-1-q.svg ",
      header: "Fairness & integrity",
      content:
        "Our pricing, which is based on the LBMA spot price, is fair, transparent, and competitive with no hidden fees. Our products are responsibly sourced from LBMA accredited refiners ensuring that we sell products of highest quality to you. We offer buyback on all our products at the best rate market rates.",
    },
    {
      image:
        "https://res.cloudinary.com/dcu3hr3eo/image/upload/h_400,c_scale/v1690556865/dukia-asset-01/undraw_transfer_money_re_6o1h.svg",
      header: "Ease of trading",
      content:
        "Using our state-of-the-art, secure, and intuitive platform, you can buy, sell, invest and do much more wih gold with just a tap of a button.",
    },
    {
      image:
        "https://res.cloudinary.com/dcu3hr3eo/image/upload/h_400,c_scale/v1690556994/dukia-asset-01/undraw_vault_re_s4my_1.svg",
      header: "Assured safekeeping of your assets",
      content:
        "For your peace of mind, your gold holdings are safe, secure, and insured with our designated third-party LBMA Vaulting Service Provider, Brinks. Products in transit are discreetly packed in a tamper-proof packaging and safely delivered to you.",
    },
    {
      image:
        "https://res.cloudinary.com/dcu3hr3eo/image/upload/h_400,c_scale/v1690557147/dukia-asset-01/undraw_new_entries_re_cffr.svg",
      header: "Risk control and management",
      content:
        "At Dukia Gold, we take seriously the safeguarding of our customers interests and we have established frameworks and controls for risk management on an ongoing basis taking into account operational risks, unlikely event of winding-down, legal and compliance risks.",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <hr />
        <h4>
          Why Invest with <br /> <span>Dukia Gold?</span>
        </h4>
        <hr />
      </div>
      <div className={classes.bodyContainer}>
        {whyInvestWithDukia.map((data, i) => {
          return (
            <div key={i} className={classes.whyInvest}>
              <div className={classes.imageSection}>
                <img src={data.image} alt={data.header} />
              </div>
              <div className={classes.textSection}>
                <h5>{data.header}</h5>
                <p>{data.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.buttonSection}>
        <Button
          type="primary"
          onClick={() => {
            navigate("/why-invest-with-us");
          }}
        >
          Find out more
        </Button>
      </div>
    </div>
  );
};

export default LandingPageWhyInvest;
