import { useContext } from "react";
import UserBuyProductsContainer from "../../Components/UserBuyProductsContainer/UserBuyProductsContainer";
import classes from "./UserBuyGold.module.css";
import subClasses from "../../Components/ProductsPage/ProductsPage.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { CircularProgress } from "@mui/material";
import { ProductsContext } from "../../Context/ProductsContext";

const UserBuyGold = () => {
  // Context
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <UserBuyProductsContainer header="Buy Gold Bars">
      <div className={classes.container}>
        {goldCoinsObject.isLoading ? (
          <div className={subClasses.loadingCOntainer}>
            <CircularProgress size="1rem" style={{ color: "rgb(51 65 85)" }} />
          </div>
        ) : (
          <>
            <h4>Gold Bars</h4>
            <div className={subClasses.container}>
              {goldCoinsObject.data
                ?.filter((data: any) => {
                  return data.type === "bar";
                })
                ?.map((data: any, i: number) => {
                  return (
                    <div className={subClasses.products} key={i}>
                      <ProductCard product={data} />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </UserBuyProductsContainer>
  );
};

export default UserBuyGold;
