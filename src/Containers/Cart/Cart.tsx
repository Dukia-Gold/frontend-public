import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { CartContext } from "../../Context/CartContext";
import { formatAmountWithCommas } from "../../Utilities/amountToString";
import classes from "./Cart.module.css";

type CartProps = {
  popUpRef: any;
};

const Cart = ({ popUpRef }: CartProps) => {
  const { cart, setCart } = useContext(CartContext);

  // Navigate
  const navigate = useNavigate();

  return (
    <div className={classes.cart} ref={popUpRef}>
      <div className={classes.cardHeader}>
        <h4>Cart</h4>
        {cart.length >= 4 && <p>See all {cart.length} items</p>}
      </div>
      <div className={classes.cartContainer}>
        {cart.length < 1 ? (
          <div className={classes.emptyCart}>Your cart is empty</div>
        ) : (
          <div className={classes.cartItemContainer}>
            <>
              {cart.slice(0, 5).map((item, i) => {
                return (
                  <div className={classes.cartItem} key={i}>
                    <div>
                      <div className={classes.upperSection}>
                        <div>
                          <img src={item.thumbnail_url} alt={item.name} />
                        </div>
                        <div className={classes.nameSection}>
                          <p>{item.name}</p>
                          {item?.fetchedPrice && (
                            <p>
                              &#8358;
                              {formatAmountWithCommas(item?.fetchedPrice)}
                              <span>{item?.fine_weight}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        className={classes.deleteCartItem}
                        onClick={() => {
                          const filteredCarts = cart.filter((data, j) => {
                            if (i !== j) {
                              return data;
                            }
                            return null;
                          });

                          setCart(filteredCarts);
                        }}
                      >
                        <g clipPath="url(#clip0_203_334)">
                          <path
                            d="M0 2.62501V1.75001C0 1.33401 0.334 1.00001 0.75 1.00001H4.25L4.544 0.416006C4.60512 0.290778 4.7003 0.185319 4.81864 0.111737C4.93697 0.0381538 5.07366 -0.000571319 5.213 6.3701e-06H8.784C8.92363 -8.2303e-05 9.06052 0.0388111 9.17924 0.112307C9.29797 0.185804 9.39382 0.290984 9.456 0.416006L9.75 1.00001H13.25C13.666 1.00001 14 1.33401 14 1.75001V2.62501C13.9997 2.72438 13.9601 2.81961 13.8899 2.88988C13.8196 2.96015 13.7244 2.99974 13.625 3.00001H0.375C0.275625 2.99974 0.180396 2.96015 0.110127 2.88988C0.0398575 2.81961 0.000263946 2.72438 0 2.62501H0ZM13 4.37501V14.5C13 14.8978 12.842 15.2794 12.5607 15.5607C12.2794 15.842 11.8978 16 11.5 16H2.5C2.10218 16 1.72064 15.842 1.43934 15.5607C1.15804 15.2794 1 14.8978 1 14.5V4.37501C1 4.16901 1.169 4.00001 1.375 4.00001H12.625C12.831 4.00001 13 4.16901 13 4.37501ZM4.5 6.50001C4.5 6.22501 4.275 6.00001 4 6.00001C3.725 6.00001 3.5 6.22501 3.5 6.50001V13.5C3.5 13.775 3.725 14 4 14C4.275 14 4.5 13.775 4.5 13.5V6.50001ZM7.5 6.50001C7.5 6.22501 7.275 6.00001 7 6.00001C6.725 6.00001 6.5 6.22501 6.5 6.50001V13.5C6.5 13.775 6.725 14 7 14C7.275 14 7.5 13.775 7.5 13.5V6.50001ZM10.5 6.50001C10.5 6.22501 10.275 6.00001 10 6.00001C9.725 6.00001 9.5 6.22501 9.5 6.50001V13.5C9.5 13.775 9.725 14 10 14C10.275 14 10.5 13.775 10.5 13.5V6.50001Z"
                            fill="red"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_203_334">
                            <rect width="14" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                );
              })}
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
