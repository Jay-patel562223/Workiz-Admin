import React, { useEffect, useState } from "react";
import {
  AppInfoAdd,
  AppInfoDelete,
  AppInfoList,
  AppInfoUpdate,
} from "../../helper/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import "./appinfo.scss";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const AppInfo = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [appList, setAppList] = useState([]);

  const [show, setShow] = useState(false);
  const [appData, setAppData] = useState({ info: "" });
  const [AppeditData, setAppEditData] = useState([]);

  const handleClose = () => {
    setShow(false);
    setAppEditData("");
    setAppData({ info: "" });
  };

  const handleShow = () => setShow(true);

  const ValidationInfoSchema = Yup.object({
    info: Yup.string().required().trim(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    handlerAppList();
  }, []);

  // appInfo listing

  const handlerAppList = async () => {
    await axios
      .get(AppInfoList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppList(res?.data?.appinfo);
      })
      .catch((error) => {
        toast.error(error.status.error === 500 ? "server inrenal error" : "");
      });
  };

  // Add App Info

  const handleAddAppInfo = async (values, { resetForm }) => {
    if (!AppeditData._id) {
      try {
        const response = await axios.post(AppInfoAdd, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerAppList();
        setAppData({ info: "" });
        toast.success(
          response.status === 201 ? "Add App Info Successfully..." : ""
        );
        setShow(false);
      } catch (err) {
        console.log("error data", err);
        Formik.resetForm();
      }
    } else {
      handleAppInfoUpdate(values);
    }
    resetForm();
  };

  const handleAppInfoUpdate = async (values) => {
    try {
      const res = await axios.patch(
        `${AppInfoUpdate}/${AppeditData._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handlerAppList();
      setAppEditData("");
      setAppData({ info: "" });
      setShow(false);
    } catch (err) {
      console.log("error data", err);
      toast.error(err.status.error === 500 ? "server inrenal error" : "");
    }
  };

  const handleUpdateInfo = (applistInfo) => {
    setAppEditData(applistInfo);
    setShow(true);
  };

  // const vali

  // delete App info

  const handleAppDelete = async (id) => {
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
        await axios.delete(`${AppInfoDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handlerAppList();
        Swal.fire("Deleted!", "", "success");
      } catch (error) {
        toast.error(error.status.error === 500 ? "server inrenal error" : "");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="view-heading-notification">
          <h2>App Info</h2>
          {appList.length > 0 ? (
            ""
          ) : (
            <button className="btn btn-md btn-primary" onClick={handleShow}>
              Add AppInfo
            </button>
          )}
        </div>
        <div className="col-md-12">
          {appList.length > 0 ? (
            appList.map((applistInfo) => {
              return (
                <React.Fragment key={applistInfo?._id}>
                  <div className="mb-5 appInfo-text-wrapper">
                    <pre className="same-txt">{applistInfo?.info}</pre>
                  </div>
                  <div className="text-end d-flex gap-3 justify-content-end mt-3">
                    <button
                      className="btn btn-md btn-success"
                      onClick={() => handleUpdateInfo(applistInfo)}
                    >
                      Edit AppInfo
                    </button>
                    <button
                      className="btn btn-md btn-danger"
                      onClick={() => handleAppDelete(applistInfo?._id)}
                    >
                      Delete AppInfo
                    </button>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <h3 className="text-center">No Data Available!</h3>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {AppeditData._id ? "Edit App Info" : "Add App Info"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(values, resetForm) =>
              handleAddAppInfo(values, resetForm)
            }
            initialValues={{
              info: AppeditData.info ? AppeditData.info : "",
            }}
            validationSchema={ValidationInfoSchema}
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="AppInfoText"
                    rows="8"
                    name="info"
                    defaultValue={values?.info}
                    onChange={handleChange}
                  ></textarea>
                  <p className="text-danger mb-0">
                    <ErrorMessage name="info" />
                  </p>
                </div>
                <div className="btn-wrapper">
                  <Button
                    variant="secondary"
                    className="me-3 "
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {AppeditData._id ? "Update App Info" : "Save App Info"}
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

export default AppInfo;
