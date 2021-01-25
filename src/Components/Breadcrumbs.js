import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
// import Link from "@material-ui/core/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function SimpleBreadcrumbs({ data }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" className="text-white">
      {data.map((value) => {
        return (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={value.link}
          >
            {value.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
