import ProductCard from "../../Components/ProductCard/ProductCard";
import classes from "../LandingPageGoldBars/LandingPageGoldBars.module.css";
import { ProductsContext } from "../../Context/ProductsContext";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";

const LandingPageGoldCoins = () => {
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <div className={classes.containerCoins}>
      <div className={classes.headerAlt}>
        <hr />
        <h4>Gold Coins</h4>
        <hr />
      </div>
      <div className={classes.productsSection}>
        {goldCoinsObject.isLoading ? (
          <CircularProgress
            color="inherit"
            size="1rem"
            style={{ color: "##111827" }}
          />
        ) : (
          goldCoinsObject.data
            ?.filter((data) => {
              return data.type === "coin";
            })
            .map((data, i) => {
              return (
                <div className={classes.products} key={i}>
                  <ProductCard product={data} />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default LandingPageGoldCoins;
