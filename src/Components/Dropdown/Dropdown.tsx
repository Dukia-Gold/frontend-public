import { useState } from "react";
import classes from "./Dropdown.module.css";

export type DropdownProps = {
  title: string | React.ReactNode;
  content: string | string[] | React.ReactNode;
};

const Dropdown = ({ title, content }: DropdownProps) => {
  const [displayContent, setDisplayContent] = useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div
        className={classes.header}
        onClick={() => {
          setDisplayContent(!displayContent);
        }}
      >
        <p>{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          style={
            displayContent
              ? { transform: "rotate(90deg)" }
              : { transform: "rotate(0deg)" }
          }
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
      <div
        className={classes.content}
        style={displayContent ? { maxHeight: "500px" } : { maxHeight: "0px" }}
      >
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
