import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "../Pages/client/Layout";

const ClientRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Layout />
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
};

export default ClientRoute;
