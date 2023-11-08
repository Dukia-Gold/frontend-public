import TextHeader from "../../Components/Header/TextHeader";
import classes from "./WhyInvestContainer.module.css";

type WhyInvestInGold = {
  whyInvestInGold: string[];
  header: string;
};

const WhyInvestContainer = ({ whyInvestInGold, header }: WhyInvestInGold) => {
  return (
    <div className={classes.container}>
      <TextHeader>{header}</TextHeader>
      <ul className={classes.whyInvestContainer}>
        {whyInvestInGold.map((data, i) => {
          return <li key={i}>{data}</li>;
        })}
      </ul>
    </div>
  );
};

export default WhyInvestContainer;
