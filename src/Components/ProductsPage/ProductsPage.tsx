import { useContext } from "react";
import classes from "./ProductsPage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { CircularProgress } from "@mui/material";
import { ProductsContext } from "../../Context/ProductsContext";
import PoolAllocatedCalculator from "../PoolAllocatedCalculator/PoolAllocatedCalculator";

const ProductsContainer = () => {
  // Context
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <div className={classes.outerContainer}>
      {goldCoinsObject.isLoading ? (
        <div className={classes.loadingCOntainer}>
          <CircularProgress size="1rem" style={{ color: "rgb(51 65 85)" }} />
        </div>
      ) : (
        <>
          <h4>Gold Bars</h4>
          <div className={classes.container}>
            {goldCoinsObject.data
              ?.filter((data, i) => {
                return data.type === "bar";
              })
              ?.map((data, i) => {
                return (
                  <div className={classes.products}>
                    <ProductCard product={data} key={i} />
                  </div>
                );
              })}
          </div>
          <h4>Gold Coins</h4>

          <div className={classes.container}>
            {goldCoinsObject.data
              ?.filter((data) => {
                return data.type === "coin";
              })
              ?.map((data, i) => {
                return (
                  <div className={classes.products}>
                    <ProductCard product={data} key={i} />
                  </div>
                );
              })}
          </div>

          <h4>Pool Allocated Gold</h4>
          <div className={classes.container}>
            <PoolAllocatedCalculator />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsContainer;
