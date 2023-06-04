import Typography from "@mui/material/Typography";
import React from "react";

export const Loader = () => {
  return (
    <section className="loader">
      <div className="backDrop">
        <div
          className="modalBox bg-white col-lg-2 col-md-4 col-10 text-center rounded p-2"
          style={{ zIndex: 999999 }}
        >
          {/* <LoadingIcon className="loadingIcon" /> */}
          <Typography variant="h6">Page Loading</Typography>
          <Typography variant="subtitle2">
            {" "}
            Loading contents, please wait...
          </Typography>{" "}
          *
        </div>
      </div>
    </section>
  );
};
