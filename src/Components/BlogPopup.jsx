import {
  Alert,
  Button,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
} from "@mui/material";

import clsx from "clsx";
import React from "react";

import { useSelector } from "react-redux";
import { DefaultEditor } from "react-simple-wysiwyg";
import { profileExtensions } from "../Services/regrex";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Services/firebase";
import { toast } from "react-hot-toast";
import { Loader } from "./Global/Loader";

export default function BlogPopup(props) {
  const {
    label,
    data,
    onClickHandler = () => {},

    onSubmitHandler,
    error,
  } = props;

  const { userProfile } = useSelector((state) => state.common);
  const [blogs, setBlogs] = React.useState(
    data
      ? data
      : {
          title: "",
          description: "",
          image: "",
        }
  );

  const [img, setImg] = React.useState(data?.image);
  const [loading, setLoading] = React.useState(false);

  const [content, setContent] = React.useState(data ? data?.description : "");
  const [errors, setErrors] = React.useState({});
  const [imageError, setImageError] = React.useState();

  const handleUpload = (e) => {
    setImageError(null);
    let d = new Date();
    const attach = parseInt(e.target.files[0].size);
    const imagesize = attach / 1024 ** 2;

    if (imagesize > 2) {
      setImageError("File is To Large");
      return;
    } else if (!profileExtensions.exec(e.target.files[0]?.name)) {
      setImageError("Please select image file");
      return;
    }

    const uploadPath = userProfile?._id + "/" + d.getTime();
    setLoading(true);
    const storageRef = ref(storage, uploadPath); // create refernce to store data
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setImageError(null);
        setImg(url);
        setLoading(false);
        toast.success("Image uploaded");
      });
    });
  };

  const onChangeHandler = (event) => {
    event.preventDefault();

    setBlogs((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  function submitHandler() {
    console.log(content);
    if (blogs?.title?.length === 0 || content?.length === 0) {
      setErrors({
        title: blogs?.title.length === 0 ? "Title is  Required" : "",
        description: content?.length === 0 ? "Description is  Required" : "",
      });
    } else {
      const updatedData = {
        data: {
          ...blogs,
          description: content,
          userId: userProfile?._id,
          image: img,
        },
        url: data ? "update" : "add",
        method: data ? "put" : "post",
      };
      onSubmitHandler(updatedData);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className={"backDrop"}>
        <Grid
          style={{ width: "50%" }}
          className={clsx("modalBox px-0  pb-2 shadow rounded ")}
        >
          <i
            class="fa fa-close m-2"
            style={{
              width: "0.8rem",
              height: "0.8rem",
              fill: "#777",
              position: "absolute",
              right: "1.25rem",
              top: "1.25rem",
              cursor: "pointer",
            }}
            onClick={onClickHandler}
          ></i>

          <div className="headText">
            <h4 className="mb-0">{label}</h4>
          </div>

          <div
            className="row m-0"
            style={{
              padding: "30px 40px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <div className={clsx("inputText col-md-12 form-control")}>
              <label>Title</label>
              <input
                type="text"
                className={clsx(
                  error?.title || errors?.title ? `errorStyle` : `inputField`,
                  "form-control"
                )}
                name="title"
                placeholder=" Enter Title"
                maxlength={150}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                value={blogs.title}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <small style={{ color: "red", marginTop: "10px" }}>
                {errors?.title ? errors.title : error?.Title}
              </small>
            </div>
            <div className={clsx("inputText col-md-12 form-control")}>
              <label>Description</label>

              <DefaultEditor
                value={content}
                style={{ height: "200px" }}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <small style={{ color: "red", marginTop: "10px" }}>
                {errors?.description}
              </small>
            </div>{" "}
            <div className={clsx("inputText col-md-12 form-control")}>
              <label>Image</label>
              <input
                type="file"
                className={clsx(
                  error?.Image || errors?.Image ? `$errorStyle` : `inputField`,
                  "form-control"
                )}
                name=" "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleUpload}
              />

              <small style={{ color: "red", marginTop: "10px" }}>
                {imageError && imageError}
              </small>
            </div>
            {img && (
              <Stack sx={{ width: "100%", margin: "5px" }} spacing={2}>
                <Alert
                  onClose={() => {
                    setImg("");
                  }}
                >
                  image
                </Alert>
              </Stack>
            )}
            <div className="col-md-12 text-center">
              <Button
                variant="contained"
                style={{
                  background: "#73114b",
                  color: "white",
                  fontSize: "16px",
                  borderRadius: "30px",
                }}
                className={clsx("px-3 mt-3 ")}
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope-paper-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.5 9.5 3 7.5v-6A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v6l-3.5 2L8 8.75l-1.5.75ZM1.059 3.635 2 3.133v3.753L0 5.713V5.4a2 2 0 0 1 1.059-1.765ZM16 5.713l-2 1.173V3.133l.941.502A2 2 0 0 1 16 5.4v.313Zm0 1.16-5.693 3.337L16 13.372v-6.5Zm-8 3.199 7.941 4.412A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516L8 10.072Zm-8 3.3 5.693-3.162L0 6.873v6.5Z"
                    />
                  </svg>
                }
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
}
