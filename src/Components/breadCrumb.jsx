import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const breadcrumbItems = [
    {
      title: "Home",
      path: "/",
      active: location.pathname === "/" ? true : false,
    },
    {
      title: "My Blogs",
      path: "/our-blogs",
      active: location.pathname.includes("/our-blogs"),
    },
  ];

  return (
    <nav>
      <div className="breadCrumbCon">
        <ul className="breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <li key={index}>
              <Link
                style={{
                  fontWeight: item.active ? 700 : 500,
                  color: item.active ? " #73114b" : "",
                }}
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
