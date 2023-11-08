import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";

type RequireAuthPropsType = {
  children?: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthPropsType) => {
  const { userObject } = useContext(AuthContext);

  // Location
  const location = useLocation();

  return (
    <>
      {userObject.isLoading ? (
        <Loader />
      ) : userObject?.data ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace={true} state={location.pathname} />
      )}
    </>
  );
};

export default RequireAuth;
