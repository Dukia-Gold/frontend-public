import TextHeader from "../../Components/Header/TextHeader";
import classes from "./FAQs.module.css";
import Dropdown from "../../Components/Dropdown/Dropdown";
import subClasses from "../LandingPageFAQ/LandingPageFAQ.module.css";
import { faqs } from "../../Utilities/faqs";
import Layout2 from "../../Components/Layout2/Layout2";

const FAQs = () => {
  return (
    <Layout2>
      <div className={classes.container}>
        <TextHeader paragraph="Here are answers to commonly asked questions. If you can’t find the answers you’re looking for, send us a message instead.">
          FAQs
        </TextHeader>
        <div className={subClasses.body}>
          {faqs.map((data, i) => {
            return (
              <Dropdown title={data.question} content={data.answer} key={i} />
            );
          })}
        </div>
      </div>
    </Layout2>
  );
};

export default FAQs;
