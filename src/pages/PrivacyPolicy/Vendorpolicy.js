import React, { useEffect, useState } from "react";
import "./PrivacyPolicy.scss";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import {
  PrivacyAdd,
  PrivacyDelete,
  PrivacyListing,
  PrivacyUpdate,
} from "../../helper/apiConfig";
import { Formik, ErrorMessage } from "formik";
import { ValidationPrivacy } from "../../components/ValidationSchema";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

const Vendorpolicy = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [privacyAndPolicy, setPrivacyAndPolicy] = useState([]);

  const [editPrivacy, setEditPrivacy] = useState("");
  const [forlist, setForList] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleClose = () => {
    setShow(false);
    setEditPrivacy("");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    handlePrivacyAndPolicyList();
    if (location.pathname === "/customerPolicy") {
      setForList("customer");
    } else {
      setForList("vendor");
    }
  }, [forlist]);

  // privacy policy listing

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePrivacyAndPolicyList = async () => {
    try {
      const response = await axios.get(PrivacyListing, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrivacyAndPolicy(response?.data?.privacy);
    } catch (error) {
      setError(error);
    }
  };

  const fillVendor = privacyAndPolicy.filter((d) => {
    return d.role === "vendor";
  });



  // add contact data

  const handlePrivacyAndPolicyAdd = async (values, { resetForm }) => {
    if (!editPrivacy._id) {
      // Add functionality
      try {
        const response = await axios.post(PrivacyAdd, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlePrivacyAndPolicyList();
        toast.success(
          response.status === 201 ? "Privacy policy Add successfully!" : "error"
        );
        setShow(false);
      } catch (err) {
        setError(err);
        Formik.resetForm();
      }
    } else {
      // Update functionality
      privacyPolicyUpadte(values);
    }
    resetForm();
  };

  const privacyPolicyUpadte = async (values) => {
    try {
      const response = await axios.patch(
        `${PrivacyUpdate}/${editPrivacy._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handlePrivacyAndPolicyList();
      setEditPrivacy("");
      toast.success(
        response.status === 200
          ? "Privacy policy Update successfully!"
          : "error"
      );
      setShow(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleContactUpdate = async (policyItem) => {
    setEditPrivacy(policyItem);
    setShow(true);
  };

  // delete privacy policy

  const handleDeletePrivacy = async (id) => {
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
        await axios.delete(`${PrivacyDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlePrivacyAndPolicyList();
        Swal.fire("Deleted!", " ", "success");
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="policy-bt">
          <h2 className="mb-0">Privacy & Policy</h2>
          {fillVendor.length > 0 ? (
            ""
          ) : (
            <Button variant="primary" onClick={handleShow}>
              Add privacy policy
            </Button>
          )}
        </div>
        {fillVendor?.map((policyItem) => {
          return (
            <React.Fragment key={policyItem?._id}>
              <div className="col-12">
                <h2 className="policy-heading text-capitalize">
                  {policyItem?.title}
                </h2>
                <span className="update-title">
                  Last updated on {" "}   
                   {new Date(`${policyItem.updatedAt}`).toLocaleDateString()}      
                </span>
              </div>
              <p className="top-para-text">{policyItem?.details}</p>
              <div className="action-wrapper">
                <button
                  className="btn btn-md btn-danger"
                  onClick={() => handleDeletePrivacy(policyItem?._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-md btn-success"
                  onClick={() => handleContactUpdate(policyItem)}
                >
                  Update
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editPrivacy?._id
              ? "Edit Privacy & Policy"
              : "Add Privacy & Policy"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(values, resetForm) =>
              handlePrivacyAndPolicyAdd(values, resetForm)
            }
            initialValues={{
              role: forlist,
              title: editPrivacy.title ? editPrivacy.title : "",
              details: editPrivacy.details ? editPrivacy.details : "",
            }}
            validationSchema={ValidationPrivacy}
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="privacyTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="privacyTitle"
                    name="title"
                    defaultValue={values?.title}
                    onChange={handleChange}
                  />
                  <p className="text-danger mb-0">
                    <ErrorMessage name="title" />
                  </p>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="privacyDetails" className="form-label">
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      id="privacyDetails"
                      rows="4"
                      name="details"
                      defaultValue={values?.details}
                      onChange={handleChange}
                    ></textarea>
                    <p className="mb-0 text-danger">
                      <ErrorMessage name="details" />
                    </p>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="me-3"
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {editPrivacy?._id
                      ? "Edit Privacy & Policy"
                      : "Save Privacy & Policy"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Vendorpolicy;
