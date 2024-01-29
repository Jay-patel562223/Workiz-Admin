import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  NotificationAdd,
  NotificationDelete,
  NotificationList,
} from "../../helper/apiConfig";
import { toast } from "react-toastify";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import demoImg from "../../assets/images/placeholderImg.png";
import { imgUrl } from "../../Datatablesource";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";

const ViewNotification = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const viewHeading = "View more notification";
  const [show, setShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  

  const [imagePreviews, setImagePreviews] = useState([]);

  const [files, setFiles] = useState("");
  const [addHeading, setAddHeading] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const handleClose = () => {
    setShow(false);
    setFiles("");
    setAddHeading("");
    setAddTitle("");
  };

  const handleShow = () => setShow(true);

  const { getRootProps, getInputProps,fileRejections,acceptedFiles} =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".png"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
        setImagePreviews(
          acceptedFiles.map((file) => URL.createObjectURL(file))
        );
      },
    });

  // useEffect(() => {
  //   setFiles(acceptedFiles[0]?.path);
  // }, [acceptedFiles]);

  const thumb = acceptedFiles.map((file, index) => {
    return (
      <li key={file.path}>
        {file.path} -{file.size}bytes
        {console.log("dtadtad", file.path)}
      </li>
    );
  });

  const fileRejectionThumb = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    notificationHandler();
  }, []);

  // Notification Listing

  const notificationHandler = async () => {
    await axios
      .get(NotificationList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotificationList(res.data.notification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerAddNotification = async () => {
    // Add functionality

    const formData = new FormData();
    formData.append("body", addTitle);
    formData.append("title", addHeading);
    formData.append("image", acceptedFiles[0]);

    try {
      const response = await axios.post(NotificationAdd, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      notificationHandler();
      toast.success(response.data.message);
      setShow(false);
      setImagePreviews([]);
      setFiles("");
      setAddHeading("");
      setAddTitle("");
    } catch (err) {
      toast.error("Error Notification !", err.error);
    }
    setShow(false);
  };

  //   delete notification
  const handleDeleteNotfication = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${NotificationDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notificationHandler();
        Swal.fire("Deleted!", " ", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="view-heading-notification">
              <h2 className="mb-0">{viewHeading}</h2>
              <button
                className="btn btn-md btn-primary mb-4"
                onClick={handleShow}
              >
                Add Notification
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card notification-card">
              <div className="card-body">
                {notificationList.length > 0 ? (
                  notificationList.map((notificationItem) => {
                    return (
                      <div
                        className="notification-wrapper"
                        key={notificationItem?._id}
                      >
                        <div className="notification-inner">
                          {notificationItem?.image === "" ? (
                            <img
                              src={demoImg}
                              alt="demoImg"
                              className="image"
                            />
                          ) : (
                            <img
                              src={notificationItem?.image}
                              alt="user-img"
                              className="image"
                            />
                          )}
                          <h5>{notificationItem?.title}</h5>
                        </div>
                        <div className="">
                          <p className="mb-3">{notificationItem?.body}</p>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-md btn-danger"
                              onClick={() =>
                                handleDeleteNotfication(notificationItem?._id)
                              }
                            >
                              {/* <AiFillDelete /> */}
                              {/* <img
                                      src={deleteIcon}
                                      alt="deleteIcon"
                                      className="img-fluid"
                                    /> */}
                              Delete Notification
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <h5 className="text-center mb-0">No Data Available!</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <section className="custom-dropzone">
                <div {...getRootProps()} className="inner-dropzone">
                  <input {...getInputProps()} />
                  <p>
                    <AiOutlinePlus /> Drop files here...
                  </p>
                </div>
                <div className="image-previews">
                  {imagePreviews.map((previewUrl) => (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="img-fluid"
                      key={previewUrl}
                    />
                  ))}
                </div>
                <ul>{thumb}</ul>
                <ul>{fileRejectionThumb}</ul>
              </section>
            </div>
            <div className="mb-3">
              <label htmlFor="addHeading" className="form-label">
                Add heading
              </label>
              <input
                type="text"
                className="form-control"
                id="addHeading"
                onChange={(e) => setAddHeading(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="addTitle" className="form-label">
                Add Description
              </label>
              <input
                type="text"
                className="form-control"
                id="addTitle"
                onChange={(e) => setAddTitle(e.target.value)}
                required
              />
            </div>
            <div className="text-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-3"
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handlerAddNotification()}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ViewNotification;
