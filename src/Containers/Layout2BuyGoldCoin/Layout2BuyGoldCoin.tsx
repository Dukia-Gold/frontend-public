import Header2GoldContainer from "../../Components/Header2GoldContainer/Header2GoldContainer";
import { useContext } from "react";
import { ProductsContext } from "../../Context/ProductsContext";
import { CircularProgress } from "@mui/material";
import subClasses from "../../Components/ProductsPage/ProductsPage.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Layout2BuyGoldCoin = () => {
  // Context
  const { goldCoinsObject } = useContext(ProductsContext);

  return (
    <Header2GoldContainer header="Gold Coins">
      <div>
        {goldCoinsObject.isLoading ? (
          <div className={subClasses.loadingCOntainer}>
            <CircularProgress size="1rem" style={{ color: "rgb(51 65 85)" }} />
          </div>
        ) : (
          <div className={subClasses.container}>
            {goldCoinsObject.data
              ?.filter((data) => {
                return data.type === "coin";
              })
              ?.map((data, i) => {
                return (
                  <div className={subClasses.products}>
                    <ProductCard product={data} key={i} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </Header2GoldContainer>
  );
};

export default Layout2BuyGoldCoin;
