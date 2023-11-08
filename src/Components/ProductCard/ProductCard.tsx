import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./ProductCard.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { formatAmountWithCommas2dp } from "../../Utilities/amountToString";

type PRoductPropType = {
  product?: any;
  key?: number;
};

const ProductCard = ({ product, key }: PRoductPropType) => {
  // COntext
  const { setCart } = useContext(CartContext);
  const { userObject } = useContext(AuthContext);

  // States
  const [activeImageState, setActiveImageState] = useState(false);

  // Navigate
  const navigate = useNavigate();

  return (
    <div className={classes.container} key={key}>
      <div
        className={classes.imageSection}
        onMouseEnter={() => {
          setActiveImageState(true);
        }}
        onMouseLeave={() => {
          setActiveImageState(false);
        }}
        onClick={() => {
          navigate(`/dukia-gold/${product.id}`);
        }}
      >
        {!activeImageState ? (
          <img src={product?.thumbnail_url} alt={product?.name} />
        ) : (
          <img src={product?.thumbnail_url2} alt={product?.name} />
        )}
        <div className={classes.rating}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span>{product?.fineness || 99.9}</span>
        </div>
      </div>
      <p>{product?.name}</p>
      <div className={classes.textSection}>
        <div>
          {(product?.ask === 0 || product?.ask === null) &&
          product.price === null ? (
            <p className={classes.noPriceNote}>
              Please call <a href="tel:+234 703 323 8121">+234 703 323 8121</a>{" "}
              or send an email to{" "}
              <a href="mailto:sales@dukiapreciousmetals.co">
                sales@dukiapreciousmetals.co
              </a>{" "}
              to order
            </p>
          ) : (
            <p className={classes.price}>
              {" "}
              &#8358;{formatAmountWithCommas2dp(product?.fetchedPrice)}
            </p>
          )}
        </div>

        {userObject.data && product?.ask !== 0 && (
          <div>
            <Button type="secondary">Sell</Button>
          </div>
        )}
        {product?.ask !== 0 && (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setCart((prevState: any) => {
                  if (prevState) {
                    return [...prevState, product];
                  } else {
                    return [product];
                  }
                });
              }}
            >
              <div className={classes.buttonInner}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  ></path>
                </svg>
                <span>Add to cart</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
