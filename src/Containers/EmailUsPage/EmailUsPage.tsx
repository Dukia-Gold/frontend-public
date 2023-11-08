import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout2 from "../../Components/Layout2/Layout2";
import classes from "../CallUsPage/CallUsPage.module.css";

const EmailUsPage = () => {
  return (
    <Layout2>
      <section className={classes.container}>
        <div>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <div>
          <h4>Hey, mail us today</h4>
          <p>
            Our e-mail correspondents are available between 8am and 9pm on the
            weekdays
          </p>
          <p>Tap the email address to send an e-mail</p>
          <a href="mailto:sales@dukiapreciousmetals.co">
            sales@dukiapreciousmetals.co
          </a>
          <Link to="/call-us" className={classes.alt}>
            Call us instead
          </Link>
        </div>
      </section>
    </Layout2>
  );
};

export default EmailUsPage;
