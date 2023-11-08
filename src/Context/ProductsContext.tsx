import axios from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

type ProductsContextType = {
  getGold: () => void;
  goldCoinsObject: goldCoinObjectType;
  getParticularItemById: (id: string) => void;
  particularGoldCoinsObject: {
    isLoading: boolean;
    data: null | any;
    error: null | string;
  };
  getItemPrice: (id: string) => void;
  particularItemPrice: string | undefined;
  getPaymentReference: () => void;
  getPaymentReferenceObject: requestObjectType;
  priceInNaira: number | undefined;
  setPriceInNaira: Dispatch<SetStateAction<number | undefined>>;
  weight: number | null;
  setWeight: Dispatch<SetStateAction<number | null>>;
  poolRequestObject: requestObjectType;
  setPoolRequestObject: Dispatch<SetStateAction<requestObjectType>>;
  setisCheckout: Dispatch<SetStateAction<boolean>>;
  setgetpaymentRefernceObject: Dispatch<SetStateAction<requestObjectType>>;
  setTotalCartAmountAndWeight: Dispatch<
    SetStateAction<{ amount: number; weight: number }>
  >;
  checkoutRequestObject: requestObjectType;
  setCheckoutRequestObject: Dispatch<SetStateAction<requestObjectType>>;
  askPrices: undefined | any;
  bidPrices: undefined | any;
  getPaymentDetailsFromRef: (ref: string) => void;
  getPaymentDetailsFromRefObject: requestObjectType;
};

type ProductsContextProviderTypes = {
  children: React.ReactNode;
};

type goldCoinObjectType = {
  isLoading: boolean;
  error: null | string;
  data: null | any[];
};

type requestObjectType = {
  data: null | any;
  error: null | string;
  isLoading: boolean;
};

export const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

const ProductsContextProvider = ({
  children,
}: ProductsContextProviderTypes) => {
  // Context
  const { userToken, userObject } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);

  // Navigate
  const navigate = useNavigate();

  // States
  const [goldCoinsObject, setGoldCoinsObject] = useState<goldCoinObjectType>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [particularGoldCoinsObject, setParticularGoldCoinsObject] = useState<{
    isLoading: boolean;
    data: null | any;
    error: null | string;
  }>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [getPaymentReferenceObject, setgetpaymentRefernceObject] =
    useState<requestObjectType>({
      isLoading: false,
      data: null,
      error: null,
    });
  const [poolRequestObject, setPoolRequestObject] = useState<requestObjectType>(
    {
      isLoading: false,
      data: null,
      error: null,
    }
  );

  const [priceInNaira, setPriceInNaira] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | null>(0);

  const getGold = async () => {
    setGoldCoinsObject({
      isLoading: true,
      data: null,
      error: null,
    });

    try {
      const productsResponse = await axios.get(
        "https://api.dukiapreciousmetals.co/api/products"
      );

      const productPromises = productsResponse.data.map(async (item: any) => {
        try {
          const priceResponse = await axios.get(
            `https://api.dukiapreciousmetals.co/api/products/${item.id}/withPrice`
          );
          return {
            ...item,
            fetchedPrice: priceResponse.data.ask_price,
            fetchedPrice2: priceResponse.data?.ask_price2,
            fetchedSellPrice: priceResponse.data.bid_price,
          };
        } catch (priceErr) {
          return item;
        }
      });

      const productsWithPrices = await Promise.all(productPromises);

      setGoldCoinsObject({
        isLoading: false,
        data: productsWithPrices,
        error: null,
      });
    } catch (err: any) {
      setGoldCoinsObject({
        isLoading: false,
        data: null,
        error: err?.response?.message,
      });
    }
  };

  const getGoldCopy = async () => {
    try {
      const productsResponse = await axios.get(
        "https://api.dukiapreciousmetals.co/api/products"
      );

      const productPromises = productsResponse.data.map(async (item: any) => {
        try {
          const priceResponse = await axios.get(
            `https://api.dukiapreciousmetals.co/api/products/${item.id}/withPrice`
          );
          return {
            ...item,
            fetchedPrice: priceResponse.data.ask_price,
            fetchedPrice2: priceResponse.data?.ask_price2,
            fetchedSellPrice: priceResponse.data.bid_price,
          };
        } catch (priceErr) {
          return item;
        }
      });

      const productsWithPrices = await Promise.all(productPromises);

      setGoldCoinsObject({
        isLoading: false,
        data: productsWithPrices,
        error: null,
      });
    } catch (err: any) {
      setGoldCoinsObject((prevState) => {
        return { ...prevState, error: err?.response?.message };
      });
    }
  };

  const getParticularItemById = async (id: string) => {
    setParticularGoldCoinsObject({
      isLoading: true,
      data: null,
      error: null,
    });

    try {
      const productsResponse = await axios.get(
        `https://api.dukiapreciousmetals.co/api/products/${id}`
      );

      const productPromises = productsResponse.data.map(async (item: any) => {
        try {
          const priceResponse = await axios.get(
            `https://dukiapreciousmetals.co/productsX.php?action=price&id=${item.id}`
          );

          return { ...item, fetchedPrice: priceResponse.data.data[0] };
        } catch (priceErr) {
          return item;
        }
      });

      const productsWithPrices = await Promise.all(productPromises);

      // if (productsWithPrices.length)
      setParticularGoldCoinsObject({
        isLoading: false,
        data: productsWithPrices[0],
        error: null,
      });
    } catch (err: any) {
      setParticularGoldCoinsObject({
        isLoading: false,
        data: null,
        error: err?.response?.message,
      });
    }
  };

  // Get Item Price
  const [particularItemPrice, setParticularItemPrice] = useState<
    string | undefined
  >();
  const getItemPrice = (id: string) => {
    axios
      .get(`https://dukiapreciousmetals.co/productsX.php?action=price&id=${id}`)
      .then((res) => {
        setParticularItemPrice(res.data[0]);
      })
      .catch((err) => {
        // console.log(err, "PRicee");
      });
  };

  const [askPrices, setAskPrices] = useState<undefined | any>();
  const [bidPrices, setBidPrices] = useState<undefined | any>();

  // Get live gold price
  const getLiveGoldPrice = () => {
    axios
      .get(`https://api.dukiapreciousmetals.co/api/live-price`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setAskPrices(res?.data?.ask);
        setBidPrices(res?.data?.bid);
      })
      .catch((err) => {});
  };

  // Get payment reference
  const getPaymentReference = () => {
    setgetpaymentRefernceObject({
      isLoading: true,
      data: null,
      error: null,
    });

    if (!userObject.data) {
      setgetpaymentRefernceObject({
        isLoading: false,
        data: null,
        error: "Please login to make this transaction",
      });
      return;
    }

    axios
      .get("https://api.dukiapreciousmetals.co/api/generatePaymentRef", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setgetpaymentRefernceObject({
          isLoading: false,
          data: res.data,
          error: null,
        });
      })
      .catch((err) => {
        setgetpaymentRefernceObject({
          isLoading: false,
          data: null,
          error: err?.response?.data?.message,
        });
      });
  };

  const getPoolObject = {
    email: userObject.data?.email,
    first_name: userObject.data?.first_name,
    last_name: userObject?.data?.last_name,
    ref: getPaymentReferenceObject.data,
    user_id: userObject?.data?.id,
    metadata: {
      first_name: userObject?.data?.first_name,
      last_name: userObject?.data?.last_name,
      cart: {
        ...goldCoinsObject.data?.find((data) => {
          return data.type === "pool";
        }),
        linePrice: priceInNaira,
        quantity: weight,
      },
    },
    order_weight: weight,
    amount: priceInNaira,
    order_option: "storage",
  };

  const getPoolAllocatedGold = () => {
    // if (!userObject.data) {
    //   navigate("/login");
    // }
    setPoolRequestObject({
      isLoading: true,
      data: null,
      error: null,
    });

    if (!getPaymentReferenceObject.data && !userObject.data) {
      return;
    }
    axios
      .post(
        `https://www.dukiapreciousmetals.co/order_pool_process`,
        getPoolObject,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setgetpaymentRefernceObject((prevState) => {
          return { ...prevState, data: null };
        });
        setPoolRequestObject({
          isLoading: false,
          data: res.data?.message,
          error: null,
        });
        navigate(`/order-confirmed/${res.data?.data?.ref}`);
      })
      .catch((err) => {
        setPoolRequestObject({
          isLoading: false,
          data: null,
          error: err.response.data.message,
        });
      });
  };

  const [isCheckout, setisCheckout] = useState<boolean>(false);
  const [totalCartAmountAndWeight, setTotalCartAmountAndWeight] = useState<{
    amount: number;
    weight: number;
  }>({
    amount: 0,
    weight: 0,
  });
  const [checkoutRequestObject, setCheckoutRequestObject] =
    useState<requestObjectType>({
      isLoading: false,
      data: null,
      error: null,
    });

  const checkoutObject = {
    email: userObject.data?.email,
    first_name: userObject.data?.first_name,
    last_name: userObject?.data?.last_name,
    ref: getPaymentReferenceObject.data,
    user_id: userObject?.data?.id,
    metadata: {
      first_name: userObject?.data?.first_name,
      last_name: userObject?.data?.last_name,
      cart: cart?.map((data) => {
        return {
          ...data,
          linePrice: data?.fetchedPrice,
          quantity: 1,
          item_id: data.id,
          id: data.id,
          price: data?.fetchedPrice,
        };
      }),
    },
    order_option: "storage",
    amount: Number(totalCartAmountAndWeight.amount),
  };

  const checkout = () => {
    setCheckoutRequestObject({
      isLoading: true,
      data: null,
      error: null,
    });
    if (!getPaymentReferenceObject.data && !userObject.data) {
      setCheckoutRequestObject({
        isLoading: false,
        data: null,
        error: null,
      });
      return;
    }
    axios
      .post(
        `https://www.dukiapreciousmetals.co/order_process`,
        checkoutObject,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setgetpaymentRefernceObject((prevState) => {
          return { ...prevState, error: null, data: null };
        });

        setCheckoutRequestObject({
          isLoading: false,
          data: res.data?.data,
          error: null,
        });
        localStorage.removeItem("cart");
        setCart([]);
        setisCheckout(false);
      })
      .catch((err) => {
        // console.log(err);
        setgetpaymentRefernceObject((prevState) => {
          return { ...prevState, error: null, data: null };
        });
        setCheckoutRequestObject({
          isLoading: false,
          data: null,
          error: err.response.data.message,
        });
        setisCheckout(false);
      });
  };

  const [getPaymentDetailsFromRefObject, setGetPaymentDetailsFromRefObject] =
    useState<requestObjectType>({
      isLoading: false,
      data: null,
      error: null,
    });

  const getPaymentDetailsFromRef = (ref: string) => {
    if (!ref) {
      return;
    }
    setGetPaymentDetailsFromRefObject({
      isLoading: true,
      data: null,
      error: null,
    });
    axios
      .get(`https://www.dukiapreciousmetals.co/api/v4/api/orders/${ref}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setGetPaymentDetailsFromRefObject({
          isLoading: false,
          data: res.data,
          error: null,
        });
      })
      .catch((err) => {
        setGetPaymentDetailsFromRefObject({
          isLoading: false,
          data: null,
          error: err?.response?.data?.message,
        });
      });
  };

  useEffect(() => {
    getGold();
  }, []);

  useEffect(() => {
    if (getPaymentReferenceObject.data && !isCheckout) getPoolAllocatedGold();

    // eslint-disable-next-line
  }, [getPaymentReferenceObject.data]);

  useEffect(() => {
    if (getPaymentReferenceObject.data && isCheckout) checkout();

    // eslint-disable-next-line
  }, [getPaymentReferenceObject.data]);

  useEffect(() => {
    const goldInterval = setInterval(() => {
      getLiveGoldPrice();
      getGoldCopy();
    }, 10000);

    return () => {
      clearInterval(goldInterval);
    };
  }, []);

  useEffect(() => {
    if (goldCoinsObject.data && cart) {
      const newCartItems = cart.map((data) => {
        return goldCoinsObject?.data?.filter((gold) => {
          if (gold?.id === data?.id) {
            return { ...gold };
          } else {
            return null;
          }
        });
      });
      setCart(newCartItems.flat());
    }

    // eslint-disable-next-line
  }, [goldCoinsObject?.data]);

  return (
    <ProductsContext.Provider
      value={{
        getGold,
        goldCoinsObject,
        getParticularItemById,
        particularGoldCoinsObject,
        getItemPrice,
        particularItemPrice,
        getPaymentReference,
        getPaymentReferenceObject,
        priceInNaira,
        setPriceInNaira,
        weight,
        setWeight,
        poolRequestObject,
        setisCheckout,
        setgetpaymentRefernceObject,
        setTotalCartAmountAndWeight,
        checkoutRequestObject,
        setCheckoutRequestObject,
        askPrices,
        getPaymentDetailsFromRef,
        getPaymentDetailsFromRefObject,
        setPoolRequestObject,
        bidPrices,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
