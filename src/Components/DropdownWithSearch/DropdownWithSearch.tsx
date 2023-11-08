import { CircularProgress } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import classes from "./DropdownWithSearch.module.css";

export type DropdownProps = {
  title: string | React.ReactNode;
  options: string[] | undefined;
  selected?: string | undefined | any;
  setSelected?: React.Dispatch<React.SetStateAction<string | undefined | any>>;
  isLoading?: boolean;
};

const DropdownWithSearch = (props: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [keyPressedValue, setKEyPressedValue] = useState("");
  const [optionsState, setOptionsState] = useState<string[] | undefined>(
    props.options
  );

  // ref
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptionsState(props.options);
  }, [props.options]);

  // useEffect(() => {
  //   dropdownRef?.current?.focus();
  //   setOptionsState(props.options);
  // }, [isActive]);

  useEffect(() => {
    const removeDropdownHandler = (e: any) => {
      if (dropdownRef && !dropdownRef?.current?.contains(e.target)) {
        setIsActive(false);
      } else {
      }
    };
    document.addEventListener("mousedown", removeDropdownHandler);

    return () => {
      document.removeEventListener("mousedown", removeDropdownHandler);
    };
  }, []);

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <div
        // tabIndex={0}
        className={classes.dropdownButton}
        onClick={() => {
          setIsActive(!isActive);

          // if (!isActive) {
          //   document.getElementById('dropdownIcon').style =
          //     'transform: rotate(-180deg)';
          // }
        }}
        tabIndex={0}
        onKeyDown={(event) => {
          setKEyPressedValue(event.key);
          const optionsCopy =
            props.options &&
            props.options.filter((data) => {
              return data?.toString().toLowerCase().charAt(0) === event.key;
            });
          setOptionsState(optionsCopy);
          if (event.key === "Backspace") {
            setOptionsState(props.options);
          }
        }}
      >
        {props?.selected || props?.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          // style={
          //   displayContent
          //     ? { transform: "rotate(90deg)" }
          //     : { transform: "rotate(0deg)" }
          // }
        >
          <path
            d="M1.25 16.5L8.75 9L1.25 1.5"
            stroke="#294B8F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isActive && (
        <div
          className={classes.dropdownContent}
          // onClick={props.onClick}
        >
          <div className={classes.inputSection}>
            <input
              type="text"
              placeholder="Search"
              value={keyPressedValue}
              onChange={(e) => {
                setKEyPressedValue(e.target.value);
              }}
            />
          </div>
          {optionsState && optionsState.length > 0 ? (
            optionsState
              ?.filter((option) => {
                return keyPressedValue.toLowerCase() === ""
                  ? option
                  : option
                      ?.toLowerCase()
                      ?.includes(keyPressedValue?.toLowerCase());
              })
              ?.map((option, i) => {
                return (
                  <div
                    key={i}
                    className={classes.dropdownItem}
                    onClick={() => {
                      if (props.setSelected) props?.setSelected(option);
                      setIsActive(false);
                    }}
                    ref={dropdownItem}
                  >
                    {option}
                  </div>
                );
              })
          ) : !props.isLoading &&
            props.options &&
            props.options.length === 0 ? (
            <p className={`${classes.dropdownItem2}`}>No matching Items</p>
          ) : (
            <div className={classes.loadingContainer}>
              <CircularProgress size="1rem" color="inherit" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearch;
