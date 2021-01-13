import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import Sidedrawer from "./Sidedrawer";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
      <Sidedrawer />
      <Route {...rest} render={(props) => <Component {...props} />} />
    </Fragment>
  );
};

export default AdminRoute;
