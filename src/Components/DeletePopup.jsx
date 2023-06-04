import React from "react";
import { Button } from "@mui/material";
import clsx from "clsx";
import Grid from "@mui/material/Grid";

export default function DeletePopup(props) {
  const { onClickHandler = () => {}, id, onSubmitHandler, error } = props;

  return (
    <div className="backDrop">
      <Grid
        style={{ width: "30%" }}
        className={clsx("modalBox px-0  pb-2 shadow rounded ")}
      >
        <div className={"headText"}>
          <div>
            <i
              class="fa fa-close"
              style={{
                width: "0.8rem",
                height: "0.8rem",
                fill: "#777",

                marginLeft: "95%",
                cursor: "pointer",
              }}
              onClick={onClickHandler}
            ></i>
          </div>
        </div>

        <form id="form" className="form" style={{ padding: "10px 40px" }}>
          <h6 className="mb-0 text-center">
            Are you sure you want to delete this?
          </h6>
          <div
            style={{ paddingBottom: "20px" }}
            className="row d-flex justify-content-center mt-4"
          >
            <Button
              style={{
                background: "#73114b",
                color: "white",
                padding: "10px",
                fontSize: "12px",
                borderRadius: "10px",
              }}
              variant="contained"
              className=" mt-3 "
              onClick={onClickHandler}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: "#73114b",
                color: "white",
                padding: "10px",
                fontSize: "12px",
                borderRadius: "10px",
                marginLeft: "20px",
              }}
              variant="contained"
              className=" mt-3 "
              onClick={() => {
                let updatedData = {
                  data: {
                    id: id,
                  },
                  method: "delete",
                  url: "delete",
                };
                onSubmitHandler(updatedData);
              }}
            >
              Delete
            </Button>
          </div>
          {/* <small style={{ fontWeight: "bold" }}>{error}</small> */}
        </form>
      </Grid>
    </div>
  );
}
