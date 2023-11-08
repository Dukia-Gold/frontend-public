import { useContext } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { ProductsContext } from "../../Context/ProductsContext";
import classes from "./LandingPageGoldBars.module.css";
import { CircularProgress } from "@mui/material";

const LandingPageGoldBars = () => {
  // Context
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <hr />
        <h4>Gold Bars</h4>
        <hr />
      </div>
      <div className={classes.productsSection}>
        {goldCoinsObject.isLoading ? (
          <CircularProgress
            color="inherit"
            size="1rem"
            style={{ color: "#fff" }}
          />
        ) : (
          goldCoinsObject.data
            ?.filter((data) => {
              return data.type === "bar";
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

export default LandingPageGoldBars;
