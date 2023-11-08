import { useContext, useEffect } from "react";
import Layout2 from "../../Components/Layout2/Layout2";
import { CartContext } from "../../Context/CartContext";
import classes from "./Checkout.module.css";
import { formatAmountWithCommas2dp } from "../../Utilities/amountToString";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { ProductsContext } from "../../Context/ProductsContext";
import { Alert, Snackbar } from "@mui/material";
import AcceptedModal from "../../Components/Modals/AcceptedModal/AcceptedModal";
import CheckoutSuccessModalBody from "./CheckoutSuccessModalBody";

const Checkout = () => {
  // Context
  const { cart } = useContext(CartContext);
  const {
    getPaymentReference,
    setisCheckout,
    getPaymentReferenceObject,
    setgetpaymentRefernceObject,
    setTotalCartAmountAndWeight,
    checkoutRequestObject,
    setCheckoutRequestObject,
  } = useContext(ProductsContext);

  function groupDuplicates(arr: any[]) {
    const groupedArray: any[] = [];

    for (const item of arr) {
      const existingGroup = groupedArray.find(
        (group) => group[0].id === item.id
      );
      if (existingGroup) {
        existingGroup.push(item);
      } else {
        groupedArray.push([item]);
      }
    }

    return groupedArray;
  }

  const result: any = groupDuplicates(cart);

  const returnSummedPrice = (priceArray: string[]) => {
    let total = 0;

    for (let i = 0; i < priceArray?.length; i++) {
      total += Number(priceArray[i]);
    }
    return total;
  };

  useEffect(() => {
    if (cart.length) {
      setTotalCartAmountAndWeight({
        weight: returnSummedPrice(
          cart?.map((datum: any) => {
            return String(datum?.weight);
          })
        ),
        amount: returnSummedPrice(
          cart?.map((datum: any) => {
            return datum.fetchedPrice;
          })
        ),
      });
    }
    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    setCheckoutRequestObject((prevState) => {
      return { ...prevState, error: null, data: null };
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Layout2>
      <div className={classes.container}>
        {checkoutRequestObject?.data && (
          <AcceptedModal
            onClick={() => {
              setCheckoutRequestObject((prevState) => {
                return { ...prevState, data: null };
              });
            }}
            body={
              <CheckoutSuccessModalBody
                onClick={() => {
                  setCheckoutRequestObject((prevState) => {
                    return { ...prevState, data: null };
                  });
                }}
                data={checkoutRequestObject?.data}
              />
            }
          />
        )}
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(getPaymentReferenceObject?.error)}
          onClose={() => {
            setgetpaymentRefernceObject((prevState) => {
              return { ...prevState, error: null };
            });
          }}
        >
          <Alert severity="error">{getPaymentReferenceObject.error}</Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(getPaymentReferenceObject?.data)}
          onClose={() => {
            setgetpaymentRefernceObject((prevState) => {
              return { ...prevState, data: null };
            });
          }}
        >
          <Alert severity="success">{`Transaction Reference ${getPaymentReferenceObject.data} generated.\n Initiating order payment process...`}</Alert>
        </Snackbar>

        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(checkoutRequestObject?.error)}
          onClose={() => {
            setCheckoutRequestObject((prevState) => {
              return { ...prevState, error: null };
            });
          }}
        >
          <Alert severity="error">{checkoutRequestObject.error}</Alert>
        </Snackbar>
        <div className={classes.cartInfo}>
          <div className={classes.header}>
            <h4>Your Cart</h4>
            <span>({cart.length} items)</span>
          </div>
          {result.map((data: any, i: number) => {
            return (
              <div key={i} className={classes.cartItem}>
                <div className={classes.imageSection}>
                  <img src={data[0].thumbnail_url} alt={data[0].name} />
                </div>
                <div className={classes.textSection}>
                  <div>
                    <span>{data[0].name}</span>
                    {/* <span>at {data[0]?.fetchedPrice}each</span> */}
                  </div>

                  <div>
                    <span>{data?.length}x</span>
                    <span>
                      at &#8358;
                      {formatAmountWithCommas2dp(data[0]?.fetchedPrice)} each
                    </span>
                  </div>

                  <div>
                    <span>Total weight</span>
                    <span>
                      {returnSummedPrice(
                        data?.map((datum: any) => {
                          return String(datum?.weight);
                        })
                      )}
                      g
                    </span>
                  </div>

                  <div>
                    <span>Subtotal</span>
                    <span>
                      &#8358;
                      {formatAmountWithCommas2dp(
                        returnSummedPrice(
                          data?.map((datum: any) => {
                            return datum.fetchedPrice;
                          })
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.checkoutSection}>
          <div className={classes.inputSection}>
            <input type="checkbox" id="Storage" checked={true} readOnly />

            <label htmlFor="Storage">
              <span>Storage</span>
              <span>
                Storage of your gold at our designated LBMA accredited
                state-of-the-art, high security, and fully insured storage
                facility in Switzerland and UK.
              </span>
            </label>
          </div>
          <div className={classes.inputSection}>
            <input type="checkbox" id="delivery" checked={false} readOnly />

            <label htmlFor="delivery">
              <span>Delivery [Call us or send an email for this option]</span>
              <span>
                Discretely wrapped and delivered through our partner couriers
                with an option for insurance.
              </span>
            </label>
          </div>
          <div>
            <span>Total</span>
            <span>
              &#8358;
              {formatAmountWithCommas2dp(
                returnSummedPrice(
                  cart?.map((item) => {
                    return item.fetchedPrice;
                  })
                )
              )}
            </span>
          </div>

          <Link to="/buy-dukia-gold-bars">Continue shopping</Link>

          <div className={classes.buttonContainer}>
            <Button
              type="primary"
              onClick={() => {
                getPaymentReference();
                setisCheckout(true);
              }}
              isLoading={
                getPaymentReferenceObject.isLoading ||
                checkoutRequestObject.isLoading
              }
            >
              Pay &#8358;
              {formatAmountWithCommas2dp(
                returnSummedPrice(
                  cart?.map((item) => {
                    return item.fetchedPrice;
                  })
                )
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Checkout;
