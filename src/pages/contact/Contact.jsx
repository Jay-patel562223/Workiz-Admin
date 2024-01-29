import React, { useEffect, useState } from "react";
import "./contact.scss";
import {
  ContactAdd,
  ContactDelete,
  ContactUpdate,
  Contactlist,
} from "../../helper/apiConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { Formik, ErrorMessage } from "formik";
import { ValidationSchema } from "../../components/ValidationSchema";
import deleteIcon from "../../assets/images/Delete.png";
import editIcon from "../../assets/images/user-edit.png";

const Contact = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [contactList, setContactList] = useState([]);

  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [editConatct, setEditContact] = useState("");

  const ContactHeading = [
    "Sr.no",
    "Email",
    "Phone Number",
    "Address",
    "Action",
  ];

  let addBtnName = "Add Contact";
  let heading = "Contact us";

  useEffect(() => {
    handlerConatctList();
  }, []);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setEditContact("");
  };

  // contact listing

  const handlerConatctList = async () => {
    await axios
      .get(Contactlist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContactList(res?.data?.contact_Us);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // add contact data

  const handlerContactAdd = async (values, { resetForm }) => {
    if (!editConatct._id) {
      // Add functionality
      try {
        const response = await axios.post(ContactAdd, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerConatctList();
        setContactData({ email: "", phone: "", address: "" });
        toast.success(response.data.message);
        setShow(false);
      } catch (err) {
        console.log("error data", err);
        Formik.resetForm();
      }
    } else {
      // Update functionality
      contactUpadte(values);
    }
    resetForm();
  };

  const contactUpadte = async (values) => {
    try {
      const response = await axios.patch(
        `${ContactUpdate}/${editConatct._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handlerConatctList();
      setEditContact("");
      setContactData({ email: "", phone: "", address: "" });
      toast.success(response?.data?.message);
      setShow(false);
    } catch (err) {
      console.log("error data", err);
    }
  };

  const handleContactUpdate = async (contactItem) => {
    setEditContact(contactItem);
    setShow(true);
  };

  // deleted conatct list

  const handleContactDelete = async (id) => {
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
        await axios.delete(`${ContactDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerConatctList();
        Swal.fire("Deleted!", " ", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="list">
            <h1>{heading}</h1>
            <div className="title">
              <div className="text-end">
                <button
                  className="btn btn-md btn-primary mb-4"
                  onClick={handleShow}
                >
                  {addBtnName}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card contact-data-card">
            <div className="card-body">
              <div className="contact-us-table table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {ContactHeading.map((headingItem, index) => {
                        return <th key={index}>{headingItem}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {contactList.map((contactItem, index) => {
                      const{email,phone,address}=contactItem;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td>{address}</td>
                          <td colSpan="4">
                            <div className="action-contact">
                              <button
                                className="btn btn-md btn-primary-light action-button"
                                onClick={() => handleContactUpdate(contactItem)}
                              >
                                <img
                                  src={editIcon}
                                  alt="editIcon"
                                  className="img-fluid"
                                />
                              </button>
                              <button
                                className="btn btn-md action-button btn-danger common-delete-btn"
                                onClick={() =>
                                  handleContactDelete(contactItem?._id)
                                }
                              >
                                <img
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                  className="img-fluid"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editConatct?._id ? "Edit Contact" : "Add Contact"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              onSubmit={(values, resetForm) =>
                handlerContactAdd(values, resetForm)
              }
              initialValues={{
                email: editConatct.email ? editConatct.email : "",
                phone: editConatct.phone ? editConatct.phone : "",
                address: editConatct.address ? editConatct.address : "",
              }}
              validationSchema={ValidationSchema}
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
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <label htmlFor="contactEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors?.email && touched?.email ? "is-invalid" : ""
                      }`}
                      id="contactEmail"
                      name="email"
                      onBlur={handleBlur}
                      defaultValue={values?.email}
                      onChange={handleChange}
                    />
                    <p className="text-danger mb-0">
                      <ErrorMessage name="email" />
                    </p>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="contactNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors?.phone && touched?.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      name="phone"
                      onBlur={handleBlur}
                      defaultValue={values?.phone}
                      onChange={handleChange}
                    />
                    <p className="text-danger mb-0">
                      <ErrorMessage name="phone"  />
                    </p>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="contactAddress" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="contactAddress"
                        rows="3"
                        name="address"
                        defaultValue={values?.address}
                        onChange={handleChange}
                      ></textarea>
                      <p className="mb-0 text-danger">
                        <ErrorMessage name="address" />
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
                      {editConatct?._id ? "Update" : "Save"}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Contact;
