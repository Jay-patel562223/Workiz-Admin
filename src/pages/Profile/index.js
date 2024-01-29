import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/actions/profile";
import "./profile.scss";
import { imgUrl } from "../../Datatablesource";
import demoImg from "../../assets/images/admin.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDropzone } from "react-dropzone";
import { AiOutlineEdit } from "react-icons/ai";
import { adminUpdateDetails } from "../../helper/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import { ValidationAdminProfile } from "../../components/ValidationSchema";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setName("");
  };
  const dispatch = useDispatch();

  const adminInfo = useSelector((state) => state.admin.admin);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch, show]);

  const updateHandler = () => {
    setShow(true);
    setName(adminInfo.name);
    setEmail(adminInfo.email);
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handelEditProfile = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("photo", acceptedFiles[0]);

    try {
      const response = await axios.patch(adminUpdateDetails, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast.success(
        response.status === 200 ? "profile updated successfully..." : ""
      );
      resetForm("")
    } catch (err) {
      toast.error("Error Notification !", err.error);
    }
    setShow(false);
    // setEmail('');
    // setName('')
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card profile-card">
              <div className="card-body">
                <div className="profile-card-wrapper">
                  {adminInfo?.photo === "" ? (
                    <img
                      src={demoImg}
                      alt="demoImg"
                      className="card-img-top admin-img d-block m-auto"
                    />
                  ) : (
                    <img
                      src={`${imgUrl}/${adminInfo?.photo}`}
                      className="card-img-top admin-img d-block m-auto"
                      alt="adminProfile"
                    />
                  )}
                  <h2 className="mb-0">{adminInfo.name}</h2>
                  <p>{adminInfo.email}</p>
                  <button
                    className="btn btn-md btn-primary"
                    onClick={() => updateHandler(adminInfo)}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                onSubmit={(values, resetForm) =>
                  handelEditProfile(values, resetForm)
                }
                initialValues={{
                  email: adminInfo?.email || "",
                  name: adminInfo?.name || "",
                }}
                validationSchema={ValidationAdminProfile}
              >
                {({
                  errors,
                  touched,
                  isSubmitting,
                  handleSubmit,
                  values,
                  handleChange,
                  handleBlur,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="profile-dropzone-img">
                      <section className="position-relative">
                        {acceptedFiles[0] ? (
                          <img
                            src={`${imgUrl}/${adminInfo?.photo}`}
                            alt="adminImg"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src={`${imgUrl}/${adminInfo?.photo}`}
                            alt="adminImg"
                            className="img-fluid"
                          />
                        )}
                        {/* <img
                      src={`${imgUrl}/${adminInfo?.photo}`}
                      alt="adminImg"
                      className="img-fluid"
                    /> */}
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <span className="text-dark edit-profile">
                            <AiOutlineEdit />
                          </span>
                        </div>
                      </section>
                      <ul className="p-0 mb-0">{files}</ul>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors?.email && touched?.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        defaultValue={values?.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-danger mb-0">
                        <ErrorMessage name="email" />
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors?.name && touched?.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        name="name"
                        defaultValue={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="text-danger mb-0">
                        <ErrorMessage name="name" />
                      </p>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Edit Profile
                    </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
