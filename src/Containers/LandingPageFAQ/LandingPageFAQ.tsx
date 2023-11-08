import Dropdown from "../../Components/Dropdown/Dropdown";
import classes from "./LandingPageFAQ.module.css";
import { faqs } from "../../Utilities/faqs";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const LandingPageFAQ = () => {
  // Navigate
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <hr />
        <h4>FAQs</h4>
        <p>
          Here are answers to commonly asked questions. If you can’t find the
          answers you’re looking for, send us a message instead.
        </p>
        <hr />
      </div>
      <div className={classes.body}>
        {faqs.slice(0, 4).map((data, i) => {
          return (
            <div key={i}>
              <Dropdown title={data.question} content={data.answer} />
            </div>
          );
        })}
      </div>
      <div className={classes.buttonSection}>
        <Button
          type="primary"
          onClick={() => {
            navigate("/faqs");
          }}
        >
          See more FAQs
        </Button>
      </div>
    </div>
  );
};

export default LandingPageFAQ;
