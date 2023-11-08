import { useContext, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import Button from "../../Components/Button/Button";
import { ProductsContext } from "../../Context/ProductsContext";
import classes from "../../Containers/LandingPageBuyPoolAllocatedGold/LandingPageBuyPoolAllocatedGold.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { formatCurrency } from "../../Utilities/amountToString";

const PoolAllocatedCalculator = () => {
  // Context
  const {
    getPaymentReference,
    getPaymentReferenceObject,
    priceInNaira,
    setPriceInNaira,
    weight,
    setWeight,
    poolRequestObject,
    setPoolRequestObject,
    goldCoinsObject,
  } = useContext(ProductsContext);

  const { userObject } = useContext(AuthContext);

  // Utils
  const roundDownToXPlaces = (number: number, x: number): number => {
    const factor = 10 ** x;
    return Math.floor(number * factor) / factor;
  };

  const roundUpToWholeNumber = (number: number): number => {
    return Math.ceil(number);
  };

  const [poolAllocatedPrice, setPoolallocatedPrice] = useState(0);
  const [poolAllocatedPrice2, setPoolallocatedPrice2] = useState(0);

  useEffect(() => {
    if (goldCoinsObject.data) {
      setPoolallocatedPrice(
        Number(
          goldCoinsObject.data.find((data) => {
            return data.type === "pool";
          })?.fetchedPrice
        )
      );
      setPoolallocatedPrice2(
        Number(
          goldCoinsObject.data.find((data) => {
            return data.type === "pool";
          })?.fetchedPrice2
        )
      );
    }
  }, [goldCoinsObject, poolAllocatedPrice, poolAllocatedPrice2]);

  useEffect(() => {
    if (priceInNaira) {
      let newWeight = 0;
      let newWeight2 = 0;

      if (Number(priceInNaira) < poolAllocatedPrice2) {
        newWeight = roundDownToXPlaces(
          Number(
            (roundUpToWholeNumber(priceInNaira) / poolAllocatedPrice).toFixed(4)
          ),
          4
        );
        setWeight(newWeight);
        return;
      } else {
        setWeight(0);

        newWeight = roundDownToXPlaces(priceInNaira / poolAllocatedPrice2, 4);

        if (weight && weight > 1) {
          newWeight2 = (newWeight as number) * 32.1507;
          setWeight(roundDownToXPlaces(newWeight2, 4));

          return;
        } else {
          newWeight2 = (newWeight as number) * 31.0135;

          setWeight(roundDownToXPlaces(newWeight2, 4));

          return;
        }
      }

      // setWeight(newWeight);
    }

    // eslint-disable-next-line
  }, [priceInNaira]);

  // useEffect(() => {
  //   let newPrice: number = 0;

  //   if (weight && weight >= 31.1035) {
  //     newPrice = weight / 32.1507;
  //   }

  //   setPriceInNaira(newPrice);

  //   // eslint-disable-next-line
  // }, [weight]);

  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    setPoolRequestObject((prevState) => {
      return { ...prevState, error: null, data: null };
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (priceInNaira && priceInNaira > 10000000) {
      setPriceError("Maximum of 10,000,000");
    } else if (priceInNaira && priceInNaira < 5000) {
      setPriceError("Minimum of 5,000");
    } else {
      setPriceError("");
    }
  }, [priceInNaira]);

  // Navigate
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <form className={classes.poolAllocatedForm}>
      <p className={classes.header}>Pool Allocated Gold</p>
      <div className={classes.errorContainer}>
        {getPaymentReferenceObject.error && (
          <Alert severity="error">{getPaymentReferenceObject.error}</Alert>
        )}
      </div>
      <div className={classes.errorContainer}>
        {poolRequestObject.error && (
          <Alert severity="error">{poolRequestObject.error}</Alert>
        )}
      </div>

      <div className={classes.errorContainer}>
        {poolRequestObject.data && (
          <Alert severity="success"> {poolRequestObject.data} </Alert>
        )}
      </div>
      <div className={classes.priceInput}>
        <input
          type="text"
          min={1}
          max={10000000}
          value={priceInNaira}
          placeholder="NGN"
          id="NGN"
          onChange={(e) => {
            setPriceInNaira(Number(e.target.value));
          }}
          onBlur={() => {
            if (priceError) {
              setPriceInNaira(0);
            }
          }}
        />
        <span>&#8358;</span>
      </div>
      <div className={classes.pricesLabels}>
        <label htmlFor="NGN">NGN</label>
        <span>{priceError}</span>
      </div>

      <span className={classes.or}>OR</span>

      <input
        type="text"
        placeholder="Weight (g)"
        id="Grams"
        // readOnly
        value={`${String(weight)}g`}
        onChange={(e) => {
          setWeight(Number(e.target.value));
        }}
        readOnly
      />
      <label htmlFor="Grams">Grams</label>

      <div className={classes.buttonSection}>
        <span>
          <Button
            type="primary"
            onClick={(e) => {
              if (!userObject.data) {
                navigate("/login", { state: location.pathname });
              }
              e.preventDefault();
              getPaymentReference();
              setPriceError("");
            }}
            disabled={
              !priceInNaira || priceInNaira < 5000 || priceInNaira > 10000000
            }
            isLoading={
              getPaymentReferenceObject.isLoading || poolRequestObject.isLoading
            }
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
              <p>{!userObject.data ? "Login to buy" : "Buy Now"}</p>
            </div>
          </Button>
        </span>
        {/* <span>
          {" "}
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
            }}
            disabled={true}
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
              <p>{!userObject.data ? "Login to sell" : "Sell Now"}</p>
            </div>
          </Button>
        </span> */}
      </div>
    </form>
  );
};

export default PoolAllocatedCalculator;
