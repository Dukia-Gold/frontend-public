import axios from "axios";
import moment from "moment";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type AuthContextProviderPropTypes = {
  children: React.ReactNode;
};

type userObjectType = {
  isLoading: boolean;
  error: string | null;
  data: {
    account_number: null | string;
    address_line_1: null | string;
    address_line_2: null | string;
    approved_at: null | string;
    approved_by: null | string;
    birthday: null | string;
    bank_account_name: string | null;
    bank_account_number: null | string;
    bank_account_bank_name: null | string;
    city: null | string;
    company: string;
    corporate_meta: null | string;
    country: null | string;
    created_at: string;
    dukia_account_number: null | string;
    email: string;
    email2: string;
    email_verified_at: string | null;
    fatca: null | string;
    first_name: string;
    gender: null | string;
    gold_account_number: null | string;
    id: number;
    is_active: number;
    is_verified: number;
    last_login: null | string;
    last_name: string;
    middle_name: string;
    migration_origin: string;
    nationality: null | string;
    occupation: null | string;
    opening_balance_au: string;
    opening_balance_au_oz: string;
    opening_balance_ng: string;
    phone: null | string;
    phone2: null | string;
    source_of_income: null | string;
    state: null | string;
    tax_identification_number: null | string;
    type: string;
    updated_at: string;
    verification_code: null;
    zip_code: null;
  } | null;
};

export type AuthContextType = {
  userToken: string | undefined;
  kycUserObject: kycUserObjectType;
  setKycUserObject: Dispatch<SetStateAction<kycUserObjectType>>;
  verifyKYC: () => void;
  verifyKycRequestObject: {
    isLoading: boolean;
    data: null | string;
    error: null | string;
  };
  setVerifyKycRequestObject: Dispatch<
    SetStateAction<{
      isLoading: boolean;
      data: null | string;
      error: null | string;
    }>
  >;
  userObject: userObjectType;
  getUserDetails: () => void;
  getAvailableBanks: () => void;
  availableBanks: {
    isLoading: boolean;
    data: null | any;
    error: null | string;
  };
  verifyUsersBankDetails: (bankCode: string | undefined) => void;
  verifyUsersBankDetailsObject: {
    isLoading: boolean;
    error: null;
  };
  signUpUser: signUpUserType;
  setSignUpUser: Dispatch<SetStateAction<signUpUserType>>;
  nationalities: nationalitiesType;
  signUpHandler: () => void;
  signUpUserObject: signUpUserObjectType;
  setSignUpUserObject: Dispatch<SetStateAction<signUpUserObjectType>>;
  userLoginInfo: userLoginInfoType;
  setUserLoginInfo: Dispatch<SetStateAction<userLoginInfoType>>;
  signInHandler: () => void;
  signOutHandler: () => void;
  signInUserObject: signUpUserObjectType;
  changePassword: changePasswordType;
  setChangePassword: Dispatch<SetStateAction<changePasswordType>>;
  changePasswordHandler: () => void;
  changePasswordRequestObject: {
    error: null | string;
    data: null | string;
    isLoading: boolean;
  };
  getReferee: (referalCode: string) => void;
  refereeRequestObject: signUpUserObjectType;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  regenerateUserToken: () => void;
  verifyUserEmail: (
    userId: string,
    token: string,
    expires: string,
    signature: string
  ) => void;
};

type nationalitiesType = {
  isLoading: boolean;
  data: null | (any[] & string);
  error: null | string;
};

export type signUpUserObjectType = {
  isLoading: boolean;
  data?: null | string | any;
  error: null | string;
};

export type kycUserObjectType = {
  user_id: number | string;
  employment_type: string;
  source_of_funds: string;
  residential_address_line1: string;
  residential_address_city: string;
  residential_address_state: string;
  residential_address_zip: string;
  residential_address_country: string;
  id_document_type: string;
  id_document: any;
  address_document: any;
  address_document_type: string;
  bank_account_name: string;
  bank_account_bank_name: string;
  bank_account_number: string;
};

type signUpUserType = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  gender: string;
  nationality: string;
  birthday: string;
  referral_code: string;
  password_confirmation: string;
  password: string;
};

type userLoginInfoType = {
  email: string;
  password: string;
  device_name: string;
};

type changePasswordType = {
  old_password: string | null;
  new_password: string | null;
  new_password_confirmation: string | null;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthContextProvider = ({ children }: AuthContextProviderPropTypes) => {
  // Utils
  const plainTetyUserToken = localStorage.getItem("Dukia User");
  const userToken = plainTetyUserToken && JSON.parse(plainTetyUserToken);

  // States

  const [userObject, setUserObject] = useState<userObjectType>({
    isLoading: true,
    error: null,
    data: null,
  });

  const [nationalities, setNationalities] = useState<nationalitiesType>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [signUpUser, setSignUpUser] = useState<signUpUserType>({
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    gender: "",
    nationality: "",
    birthday: "",
    referral_code: "",
    password_confirmation: "",
    password: "",
  });
  const [signUpUserObject, setSignUpUserObject] =
    useState<signUpUserObjectType>({
      isLoading: false,
      data: null,
      error: null,
    });

  const [signInUserObject, setSignInUserObject] =
    useState<signUpUserObjectType>({
      isLoading: false,
      error: null,
    });

  const [verifyKycRequestObject, setVerifyKycRequestObject] = useState<{
    isLoading: boolean;
    data: null | string;
    error: null | string;
  }>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [kycUserObject, setKycUserObject] = useState<kycUserObjectType>(
    {} as kycUserObjectType
  );

  const [availableBanks, setAvailavleBanks] = useState<{
    isLoading: boolean;
    data: null | {}[];
    error: null | string;
  }>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [verifyUsersBankDetailsObject, setVerifyBankUserDetailsOnject] =
    useState<{
      isLoading: boolean;
      error: null;
    }>({
      isLoading: false,
      error: null,
    });

  const [userLoginInfo, setUserLoginInfo] = useState<userLoginInfoType>({
    password: "",
    email: "",
    device_name: "sa",
  });

  const [changePassword, setChangePassword] = useState<changePasswordType>({
    old_password: null,
    new_password: null,
    new_password_confirmation: null,
  });

  const [changePasswordRequestObject, setChangePasswordRequestObject] =
    useState<{ error: null | string; data: null | string; isLoading: boolean }>(
      {
        error: null,
        data: null,
        isLoading: false,
      }
    );

  const [timeLeft, setTimeLeft] = useState<number>(60);

  // Router
  const navigate = useNavigate();
  const location = useLocation();

  const redirectRoute = location.state || "/dashboard";

  const getUserDetails = () => {
    // setUserObject({
    //   data: null,
    //   isLoading: true,
    //   error: null,
    // });
    axios
      .get("https://api.dukiapreciousmetals.co/api/me", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);

        setUserObject({
          data: res?.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        // console.log(err);

        setUserObject({
          isLoading: false,
          data: null,
          error: err.message,
        });
      });
  };

  useEffect(() => {
    getUserDetails();

    // eslint-disable-next-line
  }, []);

  // Requests
  const getNationality = () => {
    setNationalities({ data: null, isLoading: true, error: null });

    axios
      .get("https://api.dukiapreciousmetals.co/api/nationality")
      .then((res) => {
        setNationalities({
          data: res.data.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        setNationalities({
          data: null,
          error: err?.response?.data?.message,
          isLoading: false,
        });
      });
  };

  const kycFormData = new FormData();

  // console.log(JSON.stringify(kycFormData), "KYC");

  useEffect(() => {
    kycFormData.append("employment_type", kycUserObject.employment_type);
    kycFormData.append("source_of_funds", kycUserObject.source_of_funds);
    kycFormData.append("id_document_type", kycUserObject?.id_document_type);
    kycFormData.append("id_document", kycUserObject?.id_document);
    kycFormData.append("address_document", kycUserObject?.address_document);
    kycFormData.append(
      "residential_address_line1",
      kycUserObject.residential_address_line1
    );
    kycFormData.append(
      "residential_address_city",
      kycUserObject.residential_address_city
    );
    kycFormData.append(
      "residential_address_state",
      kycUserObject.residential_address_state
    );
    kycFormData.append(
      "residential_address_zip",
      kycUserObject.residential_address_zip
    );
    kycFormData.append(
      "residential_address_country",
      kycUserObject.residential_address_country
    );
    kycFormData.append(
      "address_document_type",
      kycUserObject.address_document_type
    );
    kycFormData.append(
      "bank_account_number",
      kycUserObject.bank_account_number
    );
    kycFormData.append("bank_account_name", kycUserObject.bank_account_name);
    kycFormData.append("user_id", String(kycUserObject.user_id));
    kycFormData.append(
      "bank_account_bank_name",
      kycUserObject.bank_account_bank_name
    );

    // eslint-disable-next-line
  }, [kycUserObject]);

  const verifyKYC = () => {
    if (kycUserObject) {
      setVerifyKycRequestObject({ isLoading: true, data: null, error: null });
      axios
        .post("https://api.dukiapreciousmetals.co/api/kyc", kycFormData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res, "KYC response");

          setVerifyKycRequestObject({
            isLoading: false,
            data: res.data.message,
            error: null,
          });

          setKycUserObject({
            user_id: "",
            employment_type: "",
            source_of_funds: "",
            residential_address_line1: "",
            residential_address_city: "",
            residential_address_state: "",
            residential_address_zip: "",
            residential_address_country: "",
            id_document_type: "",
            id_document: null,
            address_document: null,
            address_document_type: "",
            bank_account_name: "",
            bank_account_bank_name: "",
            bank_account_number: "",
          });
        })
        .catch((err) => {
          // console.log(err, "KYC error");

          setVerifyKycRequestObject({
            isLoading: false,
            data: null,
            error: err?.response?.data?.message,
          });
        });
    }
  };

  const getAvailableBanks = () => {
    setAvailavleBanks({ error: null, data: null, isLoading: true });
    axios
      .get("https://api.dukiapreciousmetals.co/api/banks", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAvailavleBanks({
          error: null,
          data: res.data.data,
          isLoading: true,
        });
      })
      .catch((err) => {
        setAvailavleBanks({
          error: err?.message,
          data: null,
          isLoading: true,
        });
      });
  };

  const verifyUsersBankDetails = (bankCode: string | undefined) => {
    setVerifyBankUserDetailsOnject({ isLoading: true, error: null });
    if (kycUserObject && kycUserObject.bank_account_number && bankCode) {
      axios
        .get(
          `https://api.dukiapreciousmetals.co/api/banks/verify?account_number=${kycUserObject.bank_account_number}&bank_code=${bankCode}`
        )
        .then((res) => {
          setVerifyBankUserDetailsOnject({
            isLoading: false,
            error: null,
          });
          setKycUserObject((prevState) => {
            return {
              ...prevState,
              bank_account_name: res.data.data.account_name,
              bank_account_bank_name: bankCode,
            };
          });
        })
        .catch((err) => {
          setVerifyBankUserDetailsOnject({
            isLoading: false,
            error: err?.response?.data?.error?.message,
          });
        });
    }
  };

  const signUpHandler = () => {
    setSignUpUserObject({ isLoading: true, data: null, error: null });
    axios
      .post(`https://api.dukiapreciousmetals.co/api/register`, signUpUser)

      .then((res) => {
        setSignUpUserObject({
          isLoading: false,
          data: res.data?.verification_url,
          error: null,
        });

        localStorage.setItem(
          "Dukia User",
          JSON.stringify(res.data.access_token.split("|")[1])
        );
      })
      .catch((err) => {
        setSignUpUserObject({
          isLoading: false,
          data: null,
          error: err?.response?.data?.message,
        });
      });
  };

  const verifyUserEmail = (
    userId: string,
    token: string,
    expires: string,
    signature: string
  ) => {
    axios
      .get(
        `https://api.dukiapreciousmetals.co/api/verify-email/${userId}/${token}?expires=${expires}&signatature=${signature}`
      )
      .then((res) => {
        console.log(res, "Confirm email");
      })
      .catch((err) => {
        console.log(err, "Confirm email");
      });
  };

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const localExpiryTime = localStorage.getItem("tokenExpiryTime");

  useEffect(() => {
    if (localExpiryTime) {
      setTimeLeft(
        Number(moment(localExpiryTime).diff(currentTime, "seconds")) - 30
      );
    }

    // eslint-disable-next-line
  }, []);

  const signInHandler = () => {
    setSignInUserObject({
      isLoading: true,
      error: null,
    });
    axios
      .post(`https://api.dukiapreciousmetals.co/api/login`, userLoginInfo, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("tokenExpiryTime", res.data.expires);
        // let duration2 = moment(res.data.expires).diff(currentTime, "minutes");
        // setUserLoginInfo(res.data.user);

        setUserObject({
          data: res?.data.user,
          isLoading: false,
          error: null,
        });
        setSignInUserObject({
          isLoading: false,
          error: null,
        });

        localStorage.setItem(
          "Dukia User",
          JSON.stringify(res.data.access_token.plainTextToken.split("|")[1])
        );
        navigate(redirectRoute);

        setTimeLeft(moment(res.data.expires).diff(currentTime, "seconds") - 30);
      })
      .catch((err) => {
        // console.log(err, "Sign in");

        setSignInUserObject({
          isLoading: false,
          error: err?.message,
        });
      });
  };

  const regenerateUserToken = () => {
    setSignInUserObject({
      isLoading: true,
      error: null,
    });
    axios
      .post(
        `https://api.dukiapreciousmetals.co/api/login/refreshtoken`,
        { device_name: "sa" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("tokenExpiryTime", res.data.expires);
        // let duration2 = moment(res.data.expires).diff(currentTime, "minutes");
        setUserLoginInfo(res.data.user);

        setUserObject({
          data: res?.data.user,
          isLoading: false,
          error: null,
        });
        setSignInUserObject({
          isLoading: false,
          error: null,
        });

        localStorage.setItem(
          "Dukia User",
          JSON.stringify(res.data.access_token.plainTextToken.split("|")[1])
        );

        setTimeLeft(moment(res.data.expires).diff(currentTime, "seconds"));
      })
      .catch((err) => {
        setSignInUserObject({
          isLoading: false,
          error: err?.message,
        });
      });
  };

  const changePasswordHandler = () => {
    setChangePasswordRequestObject({
      isLoading: true,
      error: null,
      data: null,
    });
    axios
      .post(
        `https://api.dukiapreciousmetals.co/api/user-management/users/passwords`,
        changePassword,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setChangePasswordRequestObject({
          error: null,
          data: res.data[0],
          isLoading: false,
        });
      })
      .catch((err) => {
        setChangePasswordRequestObject({
          isLoading: false,
          error: err.response.data.message,
          data: null,
        });
      });
  };

  const signOutHandler = () => {
    axios
      .post(
        `https://api.dukiapreciousmetals.co/api/logout`,
        {
          device_name: "sa",
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        navigate("/");
        getUserDetails();
        localStorage.removeItem("sa");
        localStorage.removeItem("tokenExpiryTime");
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const [refereeRequestObject, setRegereeRequestObject] =
    useState<signUpUserObjectType>({
      isLoading: false,
      data: null,
      error: null,
    });

  // Get referee
  const getReferee = (referalCode: string) => {
    setRegereeRequestObject({
      isLoading: true,
      data: null,
      error: null,
    });
    axios
      .get(`https://api.dukiapreciousmetals.co/api/referrals/${referalCode}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setRegereeRequestObject({
          isLoading: false,
          data: res.data.user,
          error: null,
        });
      })
      .catch((err) => {
        setRegereeRequestObject({
          isLoading: true,
          data: null,
          error: err.message,
        });
      });
  };

  //   Effects
  useEffect(() => {
    getNationality();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setKycUserObject((prevState: any) => {
      return {
        ...prevState,
        user_id: userObject.data?.id,
      };
    });

    // eslint-disable-next-line
  }, [userObject.data?.id]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        kycUserObject,
        setKycUserObject,
        verifyKYC,
        verifyKycRequestObject,
        getUserDetails,
        userObject,
        getAvailableBanks,
        availableBanks,
        verifyUsersBankDetails,
        verifyUsersBankDetailsObject,
        signUpUser,
        setSignUpUser,
        nationalities,
        signUpHandler,
        signUpUserObject,
        userLoginInfo,
        setUserLoginInfo,
        signInHandler,
        signOutHandler,
        signInUserObject,
        changePassword,
        setChangePassword,
        changePasswordHandler,
        changePasswordRequestObject,
        getReferee,
        refereeRequestObject,
        setSignUpUserObject,
        setVerifyKycRequestObject,
        timeLeft,
        setTimeLeft,
        regenerateUserToken,
        verifyUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
