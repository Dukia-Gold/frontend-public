import classes from "./ProductsDetailsPage.module.css";

type ProductDescriptionType = {
  description?: string | null;
};

const ProductDescription = ({ description }: ProductDescriptionType) => {
  return (
    <div className={classes.productDescriptionContainer}>
      {description ? description : <div>No information available yet</div>}
    </div>
  );
};

export default ProductDescription;
