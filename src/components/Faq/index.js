import React, { useEffect, useState } from "react";
import "./faq.scss";
import { FaQuoteLeft } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Addfaq, deleteFaq, faqList, updateFaq } from "../../helper/apiConfig";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import deleteIcon from "../../assets/images/Delete.png";
import editIcon from "../../assets/images/user-edit.png";
import { Formik, ErrorMessage } from "formik";
import { ValidationFaqSchema } from "../ValidationSchema";

const Faq = () => {
  const token = JSON.parse(localStorage.getItem("token"));


  const [show, setShow] = useState(false);
  const [allFaqData, setAllFaqData] = useState([]);



  const [faqData, setFaqData] = useState({ question: "", answer: "" });
  const [editData, setEditData] = useState([]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setEditData("");
  };

  

  useEffect(() => {
    handlerAllData();
  }, []);

  // faq listing data

  const handlerAllData = async () => {
    await axios
      .get(faqList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllFaqData(res.data.faqs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // faq add data functionality

  const handleSave = async (values, { resetForm }) => {
    if (!editData._id) {
      // Add functionality
      try {
        const response = await axios.post(Addfaq, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerAllData();
        setFaqData({ question: "", answer: "" });
        toast.success(response.data.Message);
        setShow(false);
      } catch (err) {
        toast.error(err.response.data.message);
        Formik.resetForm();
      }
    } else {
      // Update functionality
      faqUpadte(values);
    }
    resetForm();
  };

  const faqUpadte = async (values) => {
    try {
      await axios.patch(`${updateFaq}/${editData._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handlerAllData();
      setEditData("");
      setFaqData({ question: "", answer: "" });
      setShow(false);
    } catch (err) {
      console.log("error data", err);
    }
  };

  const handleUpdate = async (faqItem) => {
    setEditData(faqItem);
    setShow(true);
  };

  //  faq deleted

  const handleDelete = async (id) => {
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
        await axios.delete(`${deleteFaq}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerAllData();
        Swal.fire("Deleted!", "", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="faq-text-wrapper">
            <span className="title">FAQ</span>
            <h2 className="mb-2 heading">Ask us anythink</h2>
            <p className="mb-0 description">
              Have any questin? We're here to assist you.
            </p>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-md btn-primary mb-5" onClick={handleShow}>
            Add FAQ
          </button>
        </div>
        {allFaqData.length > 0 ? (
          allFaqData?.map((faqItem) => {
            const {question,answer} = faqItem;
            return (
              <div className="col-md-6 col-lg-4" key={faqItem?._id}>
                <div className="card faq-card">
                  <div className="faq-icon-wrapper">
                    <div className="faq-icon">
                      <FaQuoteLeft />
                    </div>
                    <div className="faq-action">
                      <div
                        className="delete-icon"
                        onClick={() => handleDelete(faqItem?._id)}
                      >
                        <img src={deleteIcon} alt="delete-icon" />
                      </div>
                      <div
                        className="edit-icon"
                        onClick={() => handleUpdate(faqItem)}
                      >
                        <img
                          src={editIcon}
                          alt="editIcon"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <h5 className="card-title">{question}</h5>
                    <p className="card-text">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Data Available!</h3>
        )}
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editData._id ? "Edit Faq" : "Add Faq"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(values, resetForm) => handleSave(values, resetForm)}
            initialValues={{
              question: editData.question ? editData.question : "",
              answer: editData.answer ? editData.answer : "",
              
            }}
            validationSchema={ValidationFaqSchema}
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
                <div className="mb-3">
                  <label htmlFor="faqQuestion" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="faqQuestion"
                    placeholder="Enter your question here.."
                    name="question"
                    autoComplete="off"
                    defaultValue={values.question}
                    onChange={handleChange}
                  />  
                  <p className="text-danger mb-0">
                    <ErrorMessage name="question" />
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="faqAnswer" className="form-label">
                    Answer
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="faqAnswer"
                    rows="3"
                    placeholder="Enter your answer here..."
                    name="answer"
                    autoComplete="off"
                    defaultValue={values.answer}
                    onChange={handleChange}
                  ></textarea>
                  <p className="text-danger mb-0">
                    <ErrorMessage name="answer" />
                  </p>
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
                    {editData._id ? "Update" : "Save"}
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

export default Faq;
