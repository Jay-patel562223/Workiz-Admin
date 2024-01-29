import React, { useEffect, useState } from "react";
import "./categories.scss";
import {
  Addcategory,
  Allcategory,
  Deletecategory,
  Updatecategory,
} from "../../helper/apiConfig";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import deleteIcon from "../../assets/images/Delete.png";
import editIcon from "../../assets/images/user-edit.png";
import { Formik, ErrorMessage } from "formik";
import { ValidationCategory } from "../../components/ValidationSchema";

const Categories = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [categorysData, setCategoryData] = useState([]);

  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(true);

  const [initialCategory, setInitialCategory] = useState("");

  const [editCategorys, setEditCategorys] = useState("");

  const [disable, setDisable] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setInitialCategory("");
    setEditCategorys("");
    setShow(false);
  };
  // checked

  useEffect(() => {
    handleCategoriesData();
  }, []);

  //  Allcategory

  const handleCategoriesData = async () => {
    await axios
      .get(Allcategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoryData(res?.data?.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add category

  const handleCategoriesAdd = async (values) => {
    
    if (!editCategorys._id) {
      try {
        const response = await axios.post(Addcategory, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        handleCategoriesData();
        setInitialCategory({ category: "", isactive: "" });
        toast.success(response.data.message);
        setShow(false);
      } catch (err) {
        console.log("error data", err);
        toast.error(err.error);
      }
    } else {
      handleCategoryEdit(values);
    }
  };

  const updateHandler = async (categoryItem) => {
    // setChecked(!checked);
    // categoryItem.flag == true
    if (categoryItem?.flag) {
      toast.error("values is not found");
      return;
    }
    const allData = {
      category: categoryItem.category,
      isactive: categoryItem.isactive ? false : true,
    };

    try {
      const response = await axios.patch(
        `${Updatecategory}/${categoryItem._id}`,
        allData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCategoriesData();
    } catch (err) {
      toast.error(err.response.data.error);
      if (err?.response?.status == 405) {
        return toast.error(err.response.data.message);
      }
    }
  };

  const editModalOpen = (categoryItem) => {
    setShow(true);
    setEditCategorys(categoryItem);
  };

  const handleCategoryEdit = async (values) => {
    setShow(true);
    // const allData = {
    //   category: initialCategory,
    //   isactive: editCategorys.isactive,
    // };
    try {
      await axios.patch(`${Updatecategory}/${editCategorys._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleCategoriesData();
    } catch (err) {
      toast.error(err.response.data.error);
      if (err?.response?.status == 405) {
        return toast.error(err.response.data.message);
      }
    }
    setShow(false);
  };

  // delete category

  const handleCategoryDelete = async (id) => {
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
        await axios.delete(`${Deletecategory}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleCategoriesData();
        Swal.fire("Deleted!", "", "success");
      } catch (error) {
        if (error?.response?.status == 405) {
          return toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="text-btn-wrapper">
            <h2 className="mb-4">Category</h2>
            <button className="btn btn-md btn-primary" onClick={handleShow}>
              Add Category
            </button>
          </div>
          {categorysData?.map((categoryItem) => {
            return (
              <div
                className="card categories-card border-0 mb-4"
                key={categoryItem?._id}
              >
                <div className="card-body">
                  <div className="card-wrapper">
                    <div className="category-title">
                      <h3 className="mb-0 text-capitalize">
                        {categoryItem.category}
                      </h3>
                    </div>
                    <div className="action-switch">
                      <div className="active-switch">
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() => updateHandler(categoryItem)}
                            defaultChecked={categoryItem.isactive}
                            disabled={categoryItem?.flag}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <button
                        className="btn btn-md btn-primary-light action-button"
                        onClick={() => editModalOpen(categoryItem)}
                      >
                        <img
                          src={editIcon}
                          alt="editIcon"
                          className="img-fluid"
                        />
                      </button>
                      <button
                        className="btn btn-md btn-secondary-light action-button"
                        onClick={() => handleCategoryDelete(categoryItem?._id)}
                      >
                        <img
                          src={deleteIcon}
                          alt="deleteIcon"
                          className="img-fluid"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editCategorys._id ? "Edit Category" : "Add  Category"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              onSubmit={(values) => {
                handleCategoriesAdd(values);
              }}
              initialValues={{
                category: editCategorys.category ? editCategorys.category : "",
              }}
              validationSchema={ValidationCategory}
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
                <form className="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="addcategories" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      // className="form-control"
                      className={`form-control ${
                        errors?.category && touched?.category
                          ? "is-invalid"
                          : ""
                      }`}
                      id="addcategories"
                      autoComplete="off"
                      onChange={handleChange}
                      defaultValue={values?.category}
                      name="category"
                      onBlur={handleBlur}
                    />
                    <p className="text-danger mb-0">
                      <ErrorMessage name="category" />
                    </p>
                  </div>
                  <div className="text-end">
                    <Button
                      variant="secondary"
                      className="me-3"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      disabled={isSubmitting}
                      type="submit"
                      // onClick={() => handleCategoriesAdd()}
                    >
                      {editCategorys._id ? "Update Category" : "Save Category"}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Categories;
