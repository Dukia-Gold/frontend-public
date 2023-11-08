import Layout from "../../Components/Layout/Layout";
import classes from "./KycVerification.module.css";

import TextHeader from "../../Components/Header/TextHeader";
import Button from "../../Components/Button/Button";
import DropdownWithSearch from "../../Components/DropdownWithSearch/DropdownWithSearch";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, kycUserObjectType } from "../../Context/AuthContext";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const KycVerification = () => {
  // Context
  const {
    setKycUserObject,
    setVerifyKycRequestObject,
    verifyKYC,
    verifyKycRequestObject,
    getAvailableBanks,
    availableBanks,
    kycUserObject,
    verifyUsersBankDetails,
    verifyUsersBankDetailsObject,
    getUserDetails,
  } = useContext(AuthContext);

  const [employmentType, setEmploymentType] = useState<string | undefined>();
  const [docType, setDocType] = useState<string | undefined>();
  const [addressDocType, setAddressDocType] = useState<string | undefined>();

  const [idImage, setIdImage] = useState<any>();
  const [addressDoc, setAddressDoc] = useState<any>();
  const [sourceOfFunds, setSourceOfFunds] = useState<string>();
  const [selectedBank, setSelectedBank] = useState<string>("");

  useEffect(() => {
    setKycUserObject((prevState: kycUserObjectType | any) => {
      return { ...prevState, employment_type: employmentType?.toLowerCase() };
    });

    setKycUserObject((prevState: kycUserObjectType | any) => {
      return { ...prevState, source_of_funds: sourceOfFunds?.toLowerCase() };
    });

    setKycUserObject((prevState: kycUserObjectType | any) => {
      return { ...prevState, id_document_type: docType };
    });

    setKycUserObject((prevState: kycUserObjectType) => {
      return { ...prevState, id_document: idImage };
    });

    setKycUserObject((prevState: kycUserObjectType) => {
      return { ...prevState, address_document: addressDoc };
    });

    setKycUserObject((prevState: kycUserObjectType) => {
      return {
        ...prevState,
        address_document_type: addressDocType as string,
      };
    });

    // eslint-disable-next-line
  }, [
    employmentType,
    sourceOfFunds,
    selectedBank,
    addressDoc,
    idImage,
    addressDocType,
  ]);

  useEffect(() => {
    let usersBankObject: { id: number; code: string; name: string } | null =
      null;
    if (selectedBank && availableBanks?.data?.length > 0) {
      usersBankObject = availableBanks.data?.find(
        (data: { id: number; code: string; name: string }) => {
          return data.name === selectedBank;
        }
      );

      if (usersBankObject && kycUserObject?.bank_account_number)
        verifyUsersBankDetails(usersBankObject?.code);
    }

    // eslint-disable-next-line
  }, [selectedBank, kycUserObject?.bank_account_number]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const imageHandler = (e: any) => {
    setIdImage(e.target.files[0]);
  };

  const addressDocHandler = (e: any) => {
    setAddressDoc(e.target.files[0]);
  };

  useEffect(() => {
    getAvailableBanks();
    getUserDetails();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      (containerRef.current && verifyKycRequestObject.data) ||
      (verifyKycRequestObject.error && containerRef.current)
    ) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [verifyKycRequestObject]);

  return (
    <Layout title="KYC Verification">
      <div className={classes.container} ref={containerRef}>
        <div className={classes.innerContainer}>
          <TextHeader>KYC Verification</TextHeader>

          <form className={classes.signInForm}>
            <h5>Personal Information</h5>
            <div className={classes.inputSection}>
              <label htmlFor="employmentType">Employment Type</label>
              <div>
                <DropdownWithSearch
                  title="Employment type"
                  options={[
                    "Full-time",
                    "Part-time",
                    "Self-employed",
                    "Unemployed",
                    "Retired",
                  ]}
                  selected={employmentType}
                  setSelected={setEmploymentType}
                />
              </div>
            </div>
            <div className={classes.inputSection}>
              <label htmlFor="sourceOfFunds">Source of funds</label>
              <DropdownWithSearch
                title="Source of funds"
                options={[
                  "Cash",
                  "Re-allocation-of-Assets",
                  "Inheritance",
                  "Gift",
                  "Income",
                ]}
                selected={sourceOfFunds}
                setSelected={setSourceOfFunds}
              />
            </div>
            <h5>Residential Address</h5>
            <div className={classes.inputSection}>
              <label htmlFor="residential_address_line_1">
                Residential Address Line 1
              </label>
              <input
                type="text"
                value={kycUserObject.residential_address_line1}
                id="residential_address_line_1"
                placeholder="Eg. No. 4, Dukia Gold"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      residential_address_line1: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className={classes.inputSection}>
              <label htmlFor="city">Residential Address City*</label>
              <input
                type="text"
                value={kycUserObject.residential_address_city}
                id="city"
                placeholder="Eg. Dukia"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      residential_address_city: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="state">Residential Address State*</label>
              <input
                type="text"
                value={kycUserObject.residential_address_state}
                id="state"
                placeholder="Eg. Dukia State"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      residential_address_state: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="state">Residential Address Zip (Optional)</label>
              <input
                type="number"
                value={kycUserObject.residential_address_zip}
                id="state"
                placeholder="Eg. 000000"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      residential_address_zip: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="state">Residential Address Country*</label>
              <input
                type="text"
                value={kycUserObject.residential_address_country}
                id="state"
                placeholder="Eg. Dukia State"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      residential_address_country: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="address doc">Address Document Type*</label>
              <div>
                <DropdownWithSearch
                  title="Address Document Type"
                  options={[
                    "Utility Bill (not older than 3 months)",
                    "Bank Statement",
                    "Government Issued Document",
                  ]}
                  selected={addressDocType}
                  setSelected={setAddressDocType}
                />
              </div>
            </div>

            <div className={`${classes.inputSection} ${classes.fileUpload}`}>
              <label htmlFor="uploadAddressDoc">
                {addressDoc ? addressDoc?.name : "Upload address document"}
              </label>

              <input
                type="file"
                id="uploadAddressDoc"
                accept=".pdf,.doc,.docx,.jpg,.jpeg/*"
                onChange={addressDocHandler}
              />
            </div>

            <div className={classes.inputSection}>
              <label htmlFor="Nationality">Id Document Type*</label>
              <div>
                <DropdownWithSearch
                  title="Document Type"
                  options={[
                    "International Passport",
                    "NIN Slip",
                    "Voters Card",
                    "National Identification Card",
                  ]}
                  selected={docType}
                  setSelected={setDocType}
                />
              </div>
            </div>
            <div className={`${classes.inputSection} ${classes.fileUpload}`}>
              <label htmlFor="uploadDoc">
                {idImage ? idImage?.name : "Upload document"}
              </label>

              <input
                type="file"
                id="uploadDoc"
                accept=".pdf,.doc,.docx,.jpg,.jpeg/*"
                onChange={imageHandler}
              />
            </div>

            <h5>Bank Account Information</h5>

            <div className={classes.inputSection}>
              <label htmlFor="accountNumber">Account number*</label>
              <input
                type="text"
                value={kycUserObject.bank_account_number}
                id="accountNumber"
                onChange={(e) => {
                  setKycUserObject((prevState: kycUserObjectType) => {
                    return {
                      ...prevState,
                      bank_account_number: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className={classes.inputSection}>
              <DropdownWithSearch
                title="Bank"
                selected={selectedBank}
                setSelected={setSelectedBank}
                options={availableBanks.data?.map(
                  (data: { id: number; code: string; name: string }) => {
                    return data.name;
                  }
                )}
              />
            </div>

            {verifyUsersBankDetailsObject.isLoading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress size="1rem" color="inherit" />
              </div>
            ) : !verifyUsersBankDetailsObject.isLoading &&
              !verifyUsersBankDetailsObject.error &&
              kycUserObject?.bank_account_number &&
              selectedBank ? (
              <div className={classes.inputSection}>
                <label htmlFor="accountName">Account name</label>
                <input
                  type="text"
                  id="accountName"
                  value={kycUserObject?.bank_account_name}
                  readOnly
                />
              </div>
            ) : (
              !verifyUsersBankDetailsObject.isLoading &&
              verifyUsersBankDetailsObject.error && (
                <div className={classes.error}>
                  {verifyUsersBankDetailsObject.error}
                </div>
              )
            )}

            <div className={classes.buttonSection}>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  verifyKYC();
                }}
                isLoading={verifyKycRequestObject.isLoading}
              >
                Submit KYC
              </Button>
            </div>
          </form>
          <div className={classes.responseContainer}>
            <Snackbar
              autoHideDuration={6000}
              open={Boolean(verifyKycRequestObject?.data)}
              onClose={() => {
                setVerifyKycRequestObject((prevState) => {
                  return { ...prevState, data: null };
                });
              }}
            >
              <Alert severity="success">{verifyKycRequestObject.data}</Alert>
            </Snackbar>
            <Snackbar
              autoHideDuration={6000}
              open={Boolean(verifyKycRequestObject?.error)}
              onClose={() => {
                setVerifyKycRequestObject((prevState) => {
                  return { ...prevState, error: null };
                });
              }}
            >
              <Alert severity="error">{verifyKycRequestObject.error}</Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KycVerification;
