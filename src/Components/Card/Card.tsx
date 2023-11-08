import classes from "./Card.module.css";

type CardPropTypes = {
  children: React.ReactNode;
};

const Card = ({ children }: CardPropTypes) => {
  return <div className={classes.container}>{children}</div>;
};

export default Card;
