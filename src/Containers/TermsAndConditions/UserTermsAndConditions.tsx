import TextHeader from "../../Components/Header/TextHeader";
import classes from "../AboutUs/AboutUs.module.css";
import { termsAndConditions } from "../../Utilities/termsAndConditions";
import Layout from "../../Components/Layout/Layout";

const UserTermsAndConditions = () => {
  return (
    <Layout title="Terms and Conditions">
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
    </Layout>
  );
};

export default UserTermsAndConditions;
