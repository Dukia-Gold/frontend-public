import TextHeader from "../../Components/Header/TextHeader";
import classes from "../AboutUs/AboutUs.module.css";
import { privacyStatement } from "../../Utilities/termsAndConditions";
import Layout from "../../Components/Layout/Layout";

const UserPrivacyStatement = () => {
  return (
    <Layout title="Privacy Statement">
      <div className={classes.container}>
        <TextHeader>Privacy Statement</TextHeader>
        <div className={classes.bodySection}>
          {privacyStatement.map((data, i) => {
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

export default UserPrivacyStatement;
