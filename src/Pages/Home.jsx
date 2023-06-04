import {
  AppBar,
  Avatar,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useState } from "react";
import { formatDate, paginator } from "../Services/helpers";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  blogManager,
  clearState,
  getBlogs,
  getComments,
  updateComment,
} from "../Redux/CommonReducer";

import { Loader } from "../Components/Global/Loader";
import moment from "moment";
import { DATE_FORMAT, logout } from "../Services/auth";

import { pink } from "@mui/material/colors";
import BrushIcon from "@mui/icons-material/Brush";
import Breadcrumb from "../Components/breadCrumb";
import CardContainer from "../Components/Card";
import BlogPopup from "../Components/BlogPopup";
import DeletePopup from "../Components/DeletePopup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SupervisedUserCircleSharp } from "@mui/icons-material";

export function OurBlogs() {
  const dispatch = useDispatch();

  const { userProfile, blogList, loading } = useSelector(
    (state) => state.common
  );

  const [addBlog, setAddBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState({});

  return (
    <section className="ourBlogs">
      {loading && <Loader />}
      <div className="container mx-auto ">
        {addBlog && (
          <BlogPopup
            onClickHandler={() => {
              setAddBlog(false);
            }}
            label="Add Blogs"
            error={error}
            onSubmitHandler={(value) => {
              // dispatch to add blog
              dispatch(blogManager(value))
                .unwrap()
                .then((res) => {
                  setAddBlog(false);
                  setError({});
                  dispatch(getBlogs());
                  toast.success("Added Successfully");
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          />
        )}
        {editBlog && (
          <BlogPopup
            onClickHandler={() => {
              setEditBlog(false);
            }}
            label="Edit Blogs"
            data={data}
            onSubmitHandler={(value) => {
              // dispatch to update blog
              dispatch(blogManager(value))
                .unwrap()
                .then((res) => {
                  setError({});
                  setEditBlog(false);
                  dispatch(getBlogs());
                  toast.success("Updated Successfully");
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          />
        )}
        {deleteBlog && (
          <DeletePopup
            onClickHandler={() => {
              setDeleteBlog(false);
            }}
            id={id}
            onSubmitHandler={(value) => {
              // dispatch to delete blog
              dispatch(blogManager(value))
                .unwrap()
                .then((res) => {
                  setError({});
                  setDeleteBlog(false);
                  dispatch(getBlogs());
                  toast.success("Deleted Successfully");
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          />
        )}
        <Typography
          className="my-4 d-flex justify-content-between"
          variant="h4"
        >
          {" "}
          <span>Blogs List</span>
          <Button
            color="primary"
            style={{
              cursor: "pointer",
              background: "#73114b",
              color: "white",
            }}
            className="my-4 px-4"
            onClick={() => {
              setAddBlog(true);
            }}
          >
            Add New
          </Button>
        </Typography>

        <div style={{ height: 400, width: "100%" }}>
          {blogList.filter((x) => x.userId === userProfile._id).length ===
            0 && <h4 className="text-center">No Blogs</h4>}
          <List>
            {blogList
              ?.filter((x) => x.userId === userProfile._id)
              .map((item, index) => (
                <ListItem
                  className="bg-white rounded my-2"
                  key={item._id}
                  secondaryAction={
                    <>
                      <IconButton>
                        <EditIcon
                          onClick={() => {
                            setEditBlog(true);
                            setData(item);
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => {
                            setDeleteBlog(true);
                            setId(item?._id);
                          }}
                        />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item?.title}
                    secondary={item?.description}
                  />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </section>
  );
}

export function Blogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfile, blogList, comments, loading } = useSelector(
    (state) => state.common
  );

  const [blogsList, setBlogsList] = useState([]);

  const [fullData, setFullData] = useState({});
  const [fullView, setFullView] = useState(false);
  const [commentMode, setCommentMode] = useState("Add");
  const [commentData, setCommentData] = useState({});

  useEffect(() => {
    // get blogs by dispatch
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    //update local state from blogList
    setBlogsList([...blogList]);
  }, [blogList]);

  return (
    <section className="blogs">
      {loading && <Loader />}
      {fullView ? (
        <div className="p-3">
          <h4
            style={{ cursor: "pointer" }}
            className="mt-2 "
            onClick={() => {
              setFullData({});
              setFullView(false);
              setCommentData("");
            }}
          >
            Back
          </h4>
          <div className="container bg-white rounded p-2">
            <div className="d-flex justify-content-end">
              <small className="text-muted ">
                {formatDate(fullData?.created_at)}
              </small>
            </div>
            <h2 style={{ fontWeight: "500" }}>{fullData?.title}</h2>

            <div className="border-top d-flex justify-content-center">
              <img
                className="img-fluid"
                src={fullData?.image}
                alt={fullData?.title}
              />
            </div>
            <p>{fullData?.description}</p>
            <div className="border-top">
              <h6>Comments</h6>
              {comments?.map((details) => (
                <div
                  key={details?._id}
                  className="d-flex justify-content-between align-items-center border-bottom"
                >
                  <div>
                    <p className="mb-0">{details?.content}</p>
                    <small className="text-muted d-flex align-items-center mt-0">
                      <SupervisedUserCircleSharp />{" "}
                      {details?.authorMail === userProfile?.email
                        ? "You"
                        : details?.author}{" "}
                      ({formatDate(details?.created_at)})
                    </small>
                  </div>
                  <div>
                    <EditIcon
                      onClick={() => {
                        setCommentMode("Edit");
                        setCommentData(details);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        // dispatch to delete comment
                        dispatch(
                          updateComment({
                            data: {
                              id: details._id,
                            },
                            method: "delete",
                          })
                        )
                          .unwrap()
                          .then((res) => {
                            dispatch(getComments(fullData?._id));
                            toast.success("Delete Successfully");
                          })
                          .catch((error) => {
                            toast.error(error.message);
                          });
                      }}
                    />
                  </div>
                </div>
              ))}
              <h6 className="mt-3">
                {commentMode === "Add" ? " Leave a comment" : "Edit Comment"}
              </h6>
              <input
                className="form-control"
                value={commentData?.content}
                onChange={(e) =>
                  setCommentData({
                    ...commentData,
                    content: e.target.value,
                  })
                }
              />
              <button
                className="btn mt-2"
                onClick={() => {
                  if (commentData.length === 0) {
                    toast.error("Empty Value");
                  } else {
                    // dispatch to add/update comment
                    dispatch(
                      updateComment({
                        data: {
                          ...commentData,
                          blogId: fullData._id,
                          author: userProfile?.name,
                          authorMail: userProfile?.email,
                        },
                        method: commentMode === "Add" ? "post" : "put",
                      })
                    )
                      .unwrap()
                      .then((res) => {
                        setCommentData({ content: "" });
                        setCommentMode("Add");
                        dispatch(getComments(fullData?._id));
                        toast.success("Added Successfully");
                      })
                      .catch((error) => {
                        toast.error(error.message);
                      });
                  }
                }}
              >
                Submit
              </button>
              {commentMode === "Edit" && (
                <button
                  className="btn mt-2"
                  onClick={() => {
                    setCommentData({ content: "" });
                    setCommentMode("Add");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <h4 className="mt-2" style={{ fontWeight: "700" }}>
            Blogs
          </h4>

          <div className="row m-0">
            {blogsList?.length === 0 && (
              <h4 className="text-center">No Blogs</h4>
            )}
            {blogsList?.map((data, index) => (
              <div className="col-md-3" key={index}>
                <CardContainer
                  data={data}
                  onSelect={() => {
                    setFullData(data);
                    setFullView(true);
                    dispatch(getComments(data?._id));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the 'common' state from the Redux store
  const common = useSelector((state) => state.common);

  // Parse the session expiration time using the DATE_FORMAT constant
  const tokenExpireTime = moment(common.sessionExpireTime, DATE_FORMAT);

  // Check if the user is logged in and the token has not expired
  if (!common.isLoggedIn || tokenExpireTime.isBefore(moment())) {
    // Redirect the user to the home page if logged in and token is valid
    return <Navigate to="/login" />;
  }

  return (
    <section className="home">
      <div
        className="w-100 position-relative"
        style={{ background: "#ffe6c9" }}
      >
        <AppBar position="static" style={{ background: "#73114b" }}>
          <Toolbar className="d-flex justify-content-between">
            <Chip
              style={{ background: "#fff" }}
              icon={<BrushIcon sx={{ color: pink[500] }} />}
              label="Dashboard"
            />

            <Button
              onClick={() => {
                dispatch(logout);
                dispatch(clearState());
              }}
              style={{ color: "white" }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Breadcrumb />
        <Routes>
          <Route index element={<Blogs />}></Route>
          <Route path={"/our-blogs"} element={<OurBlogs />}></Route>
        </Routes>
      </div>
    </section>
  );
}
