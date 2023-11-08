import TextHeader from "../../Components/Header/TextHeader";
import Layout2 from "../../Components/Layout2/Layout2";
import classes from "../AboutUs/AboutUs.module.css";
import { termsAndConditions } from "../../Utilities/termsAndConditions";

const TermsAndConditions = () => {
  return (
    <Layout2>
      <div className={classes.container}>
        <TextHeader>Terms and Conditions</TextHeader>
        <div className={classes.bodySection}>
          {termsAndConditions.map((data, i) => {
            return (
              <div key={i} className={classes.dukiaInfo}>
                <h4>{data.header}</h4>
                {data.paragraphs.map((paragraph, j) => {
                  return <p key={j}>{paragraph}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout2>
  );
};

export default TermsAndConditions;
