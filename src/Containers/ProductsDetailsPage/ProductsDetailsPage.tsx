import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout2 from "../../Components/Layout2/Layout2";
import PreviousLinksTabs from "../../Components/PreviousLinksTabs/PreviousLinksTabs";
import SectionsNav from "../../Components/SectionsNav/SectionsNav";
import { ProductsContext } from "../../Context/ProductsContext";
import ProductDescription from "./ProductDescription";
import classes from "./ProductsDetailsPage.module.css";
import { formatAmountWithCommas } from "../../Utilities/amountToString";
import { CircularProgress } from "@mui/material";
import { CartContext } from "../../Context/CartContext";
import { activeHandler } from "../../Utilities/activeHandler";

const ProductsDetailsPage = () => {
  // Context
  const { getParticularItemById, particularGoldCoinsObject } =
    useContext(ProductsContext);

  useEffect(() => {
    if (productId) getParticularItemById(productId);

    // eslint-disable-next-line
  }, []);
  const { setCart } = useContext(CartContext);

  // States
  const [navItems, setNavItems] = useState([
    { title: "Product Description", isActive: true },
    { title: "Delivery Information", isActive: false },
    { title: "Storage Information", isActive: false },
  ]);
  const [productQuantity, setProductQuantity] = useState<any[]>([]);

  // Param
  const { productId } = useParams();

  const previousLinks = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Buy Gold",
      route: "/buy-dukia-gold-bars",
    },
    {
      name: "Buy Gold Bars",
      route: "/dukia-gold/:id",
    },
  ];

  const [productImages, setProductImages] = useState<
    {
      image: string | null;
      isActive: boolean;
    }[]
  >([
    {
      image: particularGoldCoinsObject?.data?.thumbnail_url,
      isActive: true,
    },
    {
      image: particularGoldCoinsObject?.data?.thumbnail_url2,
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (particularGoldCoinsObject?.data) {
      setProductImages([
        {
          image: particularGoldCoinsObject?.data?.thumbnail_url,
          isActive: true,
        },
        {
          image: particularGoldCoinsObject?.data?.thumbnail_url2,
          isActive: false,
        },
      ]);
    }
  }, [particularGoldCoinsObject?.data]);

  return (
    <Layout2>
      {particularGoldCoinsObject.isLoading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress size="1rem" style={{ color: "#1c254e" }} />{" "}
        </div>
      ) : (
        <div className={classes.container}>
          <PreviousLinksTabs previousLinks={previousLinks} />
          <div className={classes.containerMain}>
            <div className={classes.imageSection}>
              <img
                src={
                  productImages.find((data) => {
                    return data?.isActive;
                  })?.image as string
                }
                loading="lazy"
                alt={particularGoldCoinsObject.data?.name}
              />

              <div className={classes.imagePreview}>
                {productImages.map((data, i) => {
                  return (
                    <img
                      src={data?.image as string}
                      alt="Product"
                      key={i}
                      className={
                        data.isActive ? classes.activeImage : undefined
                      }
                      loading="lazy"
                      onClick={() => {
                        activeHandler(i, productImages, setProductImages);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className={classes.textSection}>
              <p>{particularGoldCoinsObject.data?.name}</p>
              {particularGoldCoinsObject.data?.manufacturer && (
                <p>
                  Manufacturer(s):{" "}
                  {particularGoldCoinsObject.data?.manufacturer}
                </p>
              )}

              {particularGoldCoinsObject.data?.gross_weight && (
                <p>
                  Gross Weight: {particularGoldCoinsObject.data?.gross_weight}
                </p>
              )}

              {particularGoldCoinsObject.data?.fine_weight && (
                <p>
                  Fine Weight: {particularGoldCoinsObject.data?.fine_weight}
                </p>
              )}

              {particularGoldCoinsObject.data?.fineness && (
                <p>Fineness: {particularGoldCoinsObject.data?.fineness}</p>
              )}

              {particularGoldCoinsObject.data?.diameter && (
                <p>Diameter: {particularGoldCoinsObject.data?.diameter}</p>
              )}

              {particularGoldCoinsObject.data?.thickness && (
                <p>Thickness: {particularGoldCoinsObject.data?.thickness}</p>
              )}

              {particularGoldCoinsObject.data?.certificates && (
                <p>
                  Certificates: {particularGoldCoinsObject.data?.certificates}
                </p>
              )}

              {particularGoldCoinsObject.data?.origin && (
                <p>Origin: {particularGoldCoinsObject.data?.origin}</p>
              )}

              {particularGoldCoinsObject.data?.oz_size && (
                <p>
                  Size:{" "}
                  {formatAmountWithCommas(
                    particularGoldCoinsObject.data?.oz_size
                  )}
                  oz
                </p>
              )}
              {(particularGoldCoinsObject?.data?.ask === 0 ||
                particularGoldCoinsObject?.data?.ask === null) &&
              particularGoldCoinsObject?.data?.price === null ? (
                <p className={classes.noPriceNote}>
                  Please call{" "}
                  <a href="tel:+234 703 323 8121">+234 703 323 8121</a> or send
                  an email to{" "}
                  <a href="mailto:sales@dukiapreciousmetals.co">
                    sales@dukiapreciousmetals.co
                  </a>{" "}
                  to order
                </p>
              ) : (
                <p>
                  Price: &#8358;
                  {particularGoldCoinsObject.data?.fetchedPrice}
                </p>
              )}

              {/* <p className={classes.description}>
                {particularGoldCoinsObject.data?.description}
              </p> */}
              <div className={classes.quantity}>
                <p>Quantity</p>
                <button
                  onClick={() => {
                    let newArray: any[] = productQuantity.filter((data, i) => {
                      if (i !== productQuantity.length - 1) {
                        return data;
                      }
                      return null;
                    });
                    setProductQuantity(newArray);
                  }}
                >
                  -
                </button>
                <input type="text" readOnly value={productQuantity.length} />
                <button
                  onClick={() => {
                    setProductQuantity((prevState: any) => {
                      if (prevState) {
                        return [...prevState, particularGoldCoinsObject.data];
                      } else {
                        return [particularGoldCoinsObject.data];
                      }
                    });
                  }}
                >
                  +
                </button>
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  onClick={() => {
                    if (productQuantity)
                      setCart((prevState: any) => {
                        if (prevState) {
                          return [...prevState, ...productQuantity];
                        } else {
                          return [prevState, ...productQuantity];
                        }
                      });
                  }}
                  disabled={
                    productQuantity.length === 0 ||
                    ((particularGoldCoinsObject?.data?.ask === 0 ||
                      particularGoldCoinsObject?.data?.ask === null) &&
                      particularGoldCoinsObject?.data?.price === null)
                  }
                >
                  Add to cart
                </Button>
              </div>

              <div className={classes.navSection}>
                <SectionsNav navItems={navItems} setNavItems={setNavItems} />
                {navItems[0].isActive && (
                  <ProductDescription
                    description={particularGoldCoinsObject.data?.description}
                  />
                )}
                {navItems[1].isActive && (
                  <ProductDescription
                    description={
                      particularGoldCoinsObject?.data?.delivery_information
                    }
                  />
                )}
                {navItems[2].isActive && (
                  <ProductDescription
                    description={
                      particularGoldCoinsObject?.data?.storage_information
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout2>
  );
};

export default ProductsDetailsPage;
