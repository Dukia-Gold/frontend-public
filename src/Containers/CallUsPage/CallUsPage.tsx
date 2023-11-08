import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout2 from "../../Components/Layout2/Layout2";
import classes from "./CallUsPage.module.css";

const CallUsPage = () => {
  return (
    <Layout2>
      <section className={classes.container}>
        <div>
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div>
          <h4>Hey, talk to us today</h4>
          <p>
            Our phone lines are available between 8am and 9pm on the weekdays
          </p>
          <p>Tap a phone number to place call</p>
          <a href="tel:+2349031506699">+234 903 1506 699</a>
          <a href="tel:++2347033238121">+234 703 3238 121 </a>
          <a href="mailto:sales@dukiapreciousmetals.co" className={classes.alt}>
            Send a mail instead
          </a>
        </div>
      </section>
    </Layout2>
  );
};

export default CallUsPage;
