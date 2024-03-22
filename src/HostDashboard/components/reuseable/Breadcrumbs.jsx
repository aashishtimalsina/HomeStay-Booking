import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbsComponent = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const islast = index === pathnames.length - 1;

        return (
          <Link
            key={name}
            to={routeTo}
            style={{
              color: islast ? "black" : "rgba(0, 0, 0, 0.5)",
            }}
          >
            {name[0].toUpperCase() + name.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
