import Layout2 from "../../Components/Layout2/Layout2";
import classes from "./BuyGold.module.css";
import PreviousLinksTabs from "../../Components/PreviousLinksTabs/PreviousLinksTabs";
import TextHeader from "../../Components/Header/TextHeader";
import ProductsContainer from "../../Components/ProductsPage/ProductsPage";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../../Context/ProductsContext";

const BuyGold = () => {
  // Context
  const { getGold } = useContext(ProductsContext);

  // Utils
  const previousLinks = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Buy Dukia Gold",
      route: "/buy-dukia-gold-bars",
    },
  ];

  useEffect(() => {
    getGold();

    // eslint-disable-next-line
  }, []);

  const container = (
    <div className={classes.container}>
      <div className={classes.header}>
        <TextHeader>Buy Gold</TextHeader>
        <PreviousLinksTabs previousLinks={previousLinks} />
      </div>
      <div className={classes.products}>
        <ProductsContainer />
      </div>
      <div className={classes.dukiaInfo}>
        <h5>Dukia Gold - your precious metals store</h5>
        <p>
          Precious metals are an excellent choice for your investment portfolio.
          Are you considering to buy gold, silver or any other precious metals?
          philoro is your retailer for precious metals. Buy or sell gold,
          silver, platin or palladium in our web shop or visit us in one of our
          stores. Discover and learn more about our various products and
          services by clicking on a product category.
        </p>
      </div>
    </div>
  );

  return <Layout2>{container}</Layout2>;
};

export default BuyGold;
