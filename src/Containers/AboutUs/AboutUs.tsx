import TextHeader from "../../Components/Header/TextHeader";
import Layout2 from "../../Components/Layout2/Layout2";
import {
  aboutDukiaGold,
  meetOurLeadership,
} from "../../Utilities/aboutDUkiaGold";
import classes from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <Layout2>
      <div className={classes.container}>
        <TextHeader>About Dukia Gold</TextHeader>
        <div className={classes.bodySection}>
          {aboutDukiaGold.map((data, i) => {
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
        <div className={classes.meetOurLeadership}>
          <TextHeader>Meet Our Leadership</TextHeader>
          <div className={classes.leaderdhipBodySection}>
            {meetOurLeadership.map((data, i) => {
              return (
                <div className={classes.leadershipInfo}>
                  <div className={classes.imageSection}>
                    <img src={data.image} alt={data.name} />
                    <h5>{data.name}</h5>
                    <p>{data.role}</p>
                    <p>{data.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.atDukia}>
            At Dukia Gold, we believe in upholding the highest standards,
            creating value, and ensuring the utmost trust and satisfaction for
            our stakeholders. Welcome to a world where gold meets excellence.
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default AboutUs;
