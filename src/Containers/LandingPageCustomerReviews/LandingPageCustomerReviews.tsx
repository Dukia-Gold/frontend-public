import Button from "../../Components/Button/Button";
import classes from "./LandingPageCustomerReviews.module.css";

type customerReviewsType = {
  name: string;
  content: string;
}[];

const LandingPageCustomerReviews = () => {
  const customerReviews: customerReviewsType = [
    {
      name: "Wale Soneye",
      content:
        "I was impressed with the level of security and privacy measures the trading platform had in place. I felt comfortable trading with them with a solid assurance that my transactions are secure.",
    },
    {
      name: "Abdullateef Olushola",
      content:
        "Their customer service team is top-notch and always available to answer any questions I have on gold investment. Now I feel like a pro!",
    },
    {
      name: "Bolaji Anifowoshe",
      content:
        " I was impressed with the level of security and privacy measures the trading platform had in place. I felt comfortable trading with them with a solid assurance that my transactions are secure.",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <hr />
        <h4>Customer Reviews</h4>
        <hr />
      </div>
      <div className={classes.reviewBody}>
        {customerReviews.map((data, i) => {
          return (
            <div key={i} className={classes.review}>
              <h4>{data.name}</h4>
              <p>{data.content}</p>
              <p>"</p>
            </div>
          );
        })}
      </div>
      <div className={classes.consultation}>
        <p>
          Looking to book a free consultation or to request for a quote? Click
          the button below.
        </p>
        <div>
          <Button type="secondary">Contact us here</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageCustomerReviews;
