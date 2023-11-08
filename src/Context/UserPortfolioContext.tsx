import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { sideNavItems } from "../Utilities/sideNavItems";
import { sideNavItemsType } from "../Utilities/sideNavItems";

type UserPortfolioContextProviderProps = {
  children: React.ReactNode;
};

type depositRequestObjectType = {
  error: string | null;
  data: string | null | any;
  isLoading: boolean;
};

type UserPortfolioContextValues = {
  depositAmount: string | undefined;
  setDepositAmount: Dispatch<SetStateAction<string | undefined>>;
  createDepositRequest: () => void;
  depositRequestObject: depositRequestObjectType;
  setDepositRequestObject: Dispatch<SetStateAction<depositRequestObjectType>>;
  receipt: File | undefined;
  setReceipt: Dispatch<SetStateAction<File | undefined>>;
  addUserToNewsLetter: () => void;
  newsLetterUser: newsLetterUserType;
  setNewsLetterUser: Dispatch<SetStateAction<newsLetterUserType>>;
  newsletterSubscribeObject: {
    data: null | string;
    isLoading: boolean;
    error: null | string;
  };
  withdrawAmount: string | undefined;
  setWithdrawAmount: Dispatch<SetStateAction<string | undefined>>;
  createWithdrawalRequests: () => void;
  withdrawRequestObject: depositRequestObjectType;
  userTransactions: depositRequestObjectType;
  setUserTransactions: Dispatch<SetStateAction<depositRequestObjectType>>;
  getUserTransactions: () => void;
  sideNavItemsState: sideNavItemsType;
  setSideNavItemsState: Dispatch<SetStateAction<sideNavItemsType>>;
  createStatementOfAccountRequest: () => void;
  setCreateStatementOfAccountRequestObject: Dispatch<
    SetStateAction<depositRequestObjectType>
  >;
  createStatementOfAccountRequestObject: depositRequestObjectType;
  statementOfAccountDates: { startDate: null | string; endDate: null | string };
  setStatementOfAccoundDates: Dispatch<
    SetStateAction<{ startDate: null | string; endDate: null | string }>
  >;
};

export const UserPortfolioContext = createContext<UserPortfolioContextValues>(
  {} as UserPortfolioContextValues
);

type newsLetterUserType = {
  email: string;
  first_name: string;
  last_name: string;
};

const UserPortfolioContextProvider = ({
  children,
}: UserPortfolioContextProviderProps) => {
  // ontext
  const { userToken, userObject } = useContext(AuthContext);

  // Get States

  const [depositRequestObject, setDepositRequestObject] =
    useState<depositRequestObjectType>({
      isLoading: false,
      error: null,
      data: null,
    });

  // Input states
  const [depositAmount, setDepositAmount] = useState<string | undefined>();
  const [receipt, setReceipt] = useState<any>();
  const [newsLetterUser, setNewsLetterUser] = useState<newsLetterUserType>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [newsletterSubscribeObject, setNewsletterSubscribeObject] = useState<{
    data: null | string;
    isLoading: boolean;
    error: null | string;
  }>({
    data: null,
    isLoading: false,
    error: null,
  });
  const [withdrawAmount, setWithdrawAmount] = useState<string | undefined>();
  const [withdrawRequestObject, setWithdrawRequestObject] =
    useState<depositRequestObjectType>({
      error: null,
      isLoading: false,
      data: null,
    });
  // States
  const [sideNavItemsState, setSideNavItemsState] =
    useState<sideNavItemsType>(sideNavItems);

  // Utils

  const createDepositRequest = () => {
    console.log("Receipt:", receipt);

    setDepositRequestObject({ error: null, isLoading: true, data: null });
    if (!userObject.data) {
      return;
    }

    axios
      .post(
        "https://api.dukiapreciousmetals.co/api/deposit-requestv2",
        {
          user_id: userObject.data?.id,
          amount: depositAmount,
          receipt: receipt,
          ref: "PAY-3762-9A6S-7",
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setDepositRequestObject({
          isLoading: false,
          data: res.data.message,
          error: null,
        });
        // setDepositAmount(undefined);
        // setReceipt(undefined);
      })
      .catch((err) => {
        console.log(err, "error");

        setDepositRequestObject({
          isLoading: false,
          data: null,
          error: err.response.data.message,
        });
      });
  };

  // get notificatiobs
  const getNotifications = () => {
    axios
      .get("https://api.dukiapreciousmetals.co/api/notifications", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res, "Notofocation");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // Add user to news letter\
  const addUserToNewsLetter = () => {
    if (
      newsLetterUser.email &&
      newsLetterUser.first_name &&
      newsLetterUser.last_name
    )
      setNewsletterSubscribeObject({
        isLoading: true,
        data: null,
        error: null,
      });
    axios
      .post(
        `https://api.dukiapreciousmetals.co/api/newsletter/subscribe`,
        newsLetterUser,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setNewsletterSubscribeObject({
          isLoading: false,
          data: res.data.message,
          error: null,
        });
        setNewsLetterUser({
          email: "",
          first_name: "",
          last_name: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setNewsletterSubscribeObject({
          isLoading: false,
          data: null,
          error: err.response.data.message,
        });
      });
  };

  const createWithdrawalRequests = () => {
    if (withdrawAmount)
      setWithdrawRequestObject({
        error: null,
        data: null,
        isLoading: true,
      });
    axios
      .post(
        "https://api.dukiapreciousmetals.co/api/withdraw-request",
        { amount: withdrawAmount },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setWithdrawRequestObject({
          error: null,
          data: res?.data?.message,
          isLoading: false,
        });
      })
      .catch((err) => {
        setWithdrawRequestObject({
          error: err?.response?.data?.message,
          data: null,
          isLoading: false,
        });
      });
  };

  const [userTransactions, setUserTransactions] =
    useState<depositRequestObjectType>({
      error: null,
      data: null,
      isLoading: false,
    });

  const getUserTransactions = () => {
    if (userObject)
      setUserTransactions({
        error: null,
        data: null,
        isLoading: true,
      });
    axios
      .get(
        `https://dukiapreciousmetals.co/api/v4/api/orders/user/${userObject?.data?.id}`
      )
      .then((res) => {
        const modifiedArray = Object.values(res.data.data).map((data) => {
          return Object.values(data as {})[0];
        });
        setUserTransactions({
          error: null,
          data: modifiedArray as {},
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);

        setUserTransactions({
          error: null,
          data: null,
          isLoading: false,
        });
      });
  };

  const [
    createStatementOfAccountRequestObject,
    setCreateStatementOfAccountRequestObject,
  ] = useState<depositRequestObjectType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [statementOfAccountDates, setStatementOfAccoundDates] = useState<{
    startDate: null | string;
    endDate: null | string;
  }>({
    startDate: null,
    endDate: null,
  });

  const createStatementOfAccountRequest = () => {
    setCreateStatementOfAccountRequestObject({
      isLoading: true,
      data: null,
      error: null,
    });
    axios
      .get(
        `https://api.dukiapreciousmetals.co/api/statement-of-account-requests`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setCreateStatementOfAccountRequestObject({
          isLoading: false,
          data: "Thank you for your request. You will receive your statement of account in your email within three (3) Business Days",
          error: null,
        });
      })
      .catch((err) => {
        console.log(err);
        setCreateStatementOfAccountRequestObject({
          isLoading: false,
          data: null,
          error: err?.response?.data?.message,
        });
      });
  };

  // Effects
  useEffect(() => {
    getNotifications();

    // eslint-disable-next-line
  }, []);

  return (
    <UserPortfolioContext.Provider
      value={{
        depositAmount,
        setDepositAmount,
        createDepositRequest,
        depositRequestObject,
        setDepositRequestObject,
        receipt,
        setReceipt,
        addUserToNewsLetter,
        newsLetterUser,
        setNewsLetterUser,
        newsletterSubscribeObject,
        withdrawAmount,
        setWithdrawAmount,
        createWithdrawalRequests,
        withdrawRequestObject,
        userTransactions,
        getUserTransactions,
        setUserTransactions,
        sideNavItemsState,
        setSideNavItemsState,
        createStatementOfAccountRequest,
        createStatementOfAccountRequestObject,
        setCreateStatementOfAccountRequestObject,
        statementOfAccountDates,
        setStatementOfAccoundDates,
      }}
    >
      {children}
    </UserPortfolioContext.Provider>
  );
};

export default UserPortfolioContextProvider;
