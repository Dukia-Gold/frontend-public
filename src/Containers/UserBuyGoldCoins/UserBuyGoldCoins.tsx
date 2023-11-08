import { useContext } from "react";
import UserBuyProductsContainer from "../../Components/UserBuyProductsContainer/UserBuyProductsContainer";
import classes from "../UserBuyGold/UserBuyGold.module.css";
import subClasses from "../../Components/ProductsPage/ProductsPage.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { CircularProgress } from "@mui/material";
import { ProductsContext } from "../../Context/ProductsContext";

const UserBuyGoldCoins = () => {
  // Context
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <UserBuyProductsContainer header="Buy Gold Coins">
      <div className={classes.container}>
        {goldCoinsObject.isLoading ? (
          <div className={subClasses.loadingCOntainer}>
            <CircularProgress size="1rem" style={{ color: "rgb(51 65 85)" }} />
          </div>
        ) : (
          <>
            <h4>Gold Coins</h4>
            <div className={subClasses.container}>
              {goldCoinsObject.data
                ?.filter((data: any) => {
                  return data.type === "coin";
                })
                ?.map((data: any, i: number) => {
                  return (
                    <div className={subClasses.products} key={i}>
                      <ProductCard product={data} key={i} />
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

export default UserBuyGoldCoins;
