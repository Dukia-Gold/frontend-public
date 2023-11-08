import { useRef, useState } from "react";
import DropdownWithSearch from "../../Components/DropdownWithSearch/DropdownWithSearch";
import TextHeader from "../../Components/Header/TextHeader";
import Layout from "../../Components/Layout/Layout";
import classes from "./KycVerification2.module.css";

const KycVerification2 = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [residentCountry, setResidentCOuntry] = useState<string>("");

  return (
    <Layout title="KYC Verification">
      <div className={classes.container} ref={containerRef}>
        <div className={classes.innerContainer}>
          <TextHeader>KYC Verification</TextHeader>

          <form className={classes.signInForm}>
            <h5> Residential Information</h5>
            <div className={classes.inputSection}>
              <label htmlFor="residentCountry">Country of residence</label>
              <div>
                <DropdownWithSearch
                  title="Employment type"
                  options={["Nigeria"]}
                  selected={residentCountry}
                  setSelected={setResidentCOuntry}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default KycVerification2;
