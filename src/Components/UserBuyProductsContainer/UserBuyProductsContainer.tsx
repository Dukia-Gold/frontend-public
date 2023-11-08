import React from "react";
import Layout from "../Layout/Layout";

type UserBuyProductsContainerTypes = {
  children: React.ReactNode;
  header: string;
};

const UserBuyProductsContainer = ({
  header,
  children,
}: UserBuyProductsContainerTypes) => {
  return <Layout title={header}>{children}</Layout>;
};

export default UserBuyProductsContainer;
