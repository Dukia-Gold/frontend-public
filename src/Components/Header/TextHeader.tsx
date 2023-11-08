import classes from "./TextHeader.module.css";

type HeaderType = {
  children: React.ReactNode;
  paragraph?: string;
};

const TextHeader = ({ children, paragraph }: HeaderType) => {
  return (
    <div className={classes.header}>
      <hr />
      <h4>{children}</h4>
      {paragraph && <p>{paragraph}</p>}
      <hr />
    </div>
  );
};

export default TextHeader;
