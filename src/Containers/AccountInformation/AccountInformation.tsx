import classes from "./AccountInformation.module.css";
import Layout from "../../Components/Layout/Layout";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import moment from "moment";
import { Link } from "react-router-dom";

const AccountInformation = () => {
  // Context
  const { userObject } = useContext(AuthContext);

  console.log(userObject, "user object");

  return (
    <Layout title="Account Information">
      <div className={classes.container}>
        <div className={classes.nameSection}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="105"
            height="105"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <div>
            <div>
              <p>
                {`${userObject.data?.first_name.charAt(0).toUpperCase() || ""}${
                  userObject.data?.first_name.slice(1) || ""
                }`}{" "}
                {`${
                  userObject.data?.last_name.charAt(0).toUpperCase() ||
                  "No name"
                }${userObject.data?.last_name.slice(1) || ""}`}
              </p>

              {userObject.data?.is_verified && (
                <svg
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />{" "}
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </svg>
              )}
              {userObject.data?.is_verified && (
                <div className={classes.verifiedTag}>verified</div>
              )}
            </div>
            <p>{userObject.data?.email || "No email"} </p>
          </div>
        </div>

        <p className={classes.contactUs}>
          Do you want to update your account information, contact us{" "}
          <Link to="/">HERE</Link>.
        </p>

        <div className={classes.bodySection}>
          <h4>Personal Information</h4>
          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                value={userObject.data?.first_name || "No first name"}
                readOnly
              />
            </div>

            <div className={classes.info}>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                value={userObject.data?.last_name || "No last name"}
                readOnly
              />
            </div>
          </div>

          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="phone">Middle name</label>
              <input
                type="text"
                id="middle name"
                value={userObject.data?.middle_name || ""}
                readOnly
              />
            </div>
          </div>

          <div className={classes.info}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="text"
              id="emailAddress"
              value={userObject.data?.email || "No email address"}
              readOnly
            />
          </div>

          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="phone">Phone 1</label>
              <input
                type="text"
                id="phone"
                value={userObject.data?.phone || "No phone number"}
                readOnly
              />
            </div>
            <div className={classes.info}>
              <label htmlFor="veriedDate">Verified on</label>
              <input
                type="text"
                id="veriedDate"
                value={
                  moment(userObject.data?.email_verified_at).format(
                    "dddd, MMMM Do YYYY, h:mm a"
                  ) || "Not verified yet"
                }
                readOnly
              />
            </div>
          </div>

          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="veriedDate">Account Type</label>
              <input
                type="text"
                id="veriedDate"
                value={userObject.data?.type === "personal" ? "Individual" : ""}
                readOnly
              />
            </div>
          </div>

          <h4>Residential Address </h4>
          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="phone">Residential Address Line 1</label>
              <input
                type="text"
                id="phone"
                value={userObject.data?.address_line_1 || "No Residential City"}
                readOnly
              />
            </div>

            <div className={classes.info}>
              <label htmlFor="phone">Residential City</label>
              <input
                type="text"
                id="phone"
                value={userObject.data?.city || "No Residential City"}
                readOnly
              />
            </div>
          </div>
          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="veriedDate">Residential Address Zip</label>
              <input
                type="text"
                id="veriedDate"
                value={userObject?.data?.zip_code || "No Residential State"}
                readOnly
              />
            </div>

            <div className={classes.info}>
              <label htmlFor="veriedDate">State</label>
              <input
                type="text"
                id="veriedDate"
                value={userObject?.data?.state || "No Residential State"}
                readOnly
              />
            </div>
          </div>

          <h4>Bank Account Information </h4>

          <div className={classes.infoFlex}>
            <div className={classes.info}>
              <label htmlFor="dukiaAcctNo">Account Number</label>
              <input
                type="text"
                id="dukiaAcctNo"
                value={
                  userObject.data?.bank_account_number ||
                  "No Bank Account Number"
                }
                readOnly
              />
            </div>
            <div className={classes.info}>
              <label htmlFor="phone">Account Name</label>
              <input
                type="text"
                id="phone"
                value={
                  userObject.data?.bank_account_name || "No Bank Account number"
                }
                readOnly
              />
            </div>
            <div className={classes.info}>
              <label htmlFor="phone2">Bank Name</label>
              <input
                type="text"
                id="phone2"
                value={
                  userObject.data?.bank_account_bank_name || "No Bank name"
                }
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountInformation;
