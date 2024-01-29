import React, { useEffect, useState } from "react";
import "./tc.scss";
import axios from "axios";
import {
  TermsAndConditionsAdd,
  TermsAndConditionsDelete,
  TermsAndConditionsListing,
  TermsAndConditionsUpdate,
} from "../../helper/apiConfig";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import TextEditor from "../../components/TextEditor";

const VendorTC = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [content, setContent] = useState("");

  const [editTerm, setEditTerm] = useState(null);

  const [termsAndConditions, setTermsAndConditions] = useState([]);

  let textHeading = "Terms & Conditions";

  const fill = termsAndConditions.filter((d) => {
    return d.role == "vendor";
  });

  const handleUpdateText = (tcItem) => {
    setEditTerm(tcItem);
    setContent(tcItem?.tc);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    handleTermConditionList();
  }, []);

  const handleTermConditionList = async () => {
    try {
      const response = await axios.get(TermsAndConditionsListing, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTermsAndConditions(response?.data?.tcs);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTC = async () => {
    const data = {
      role: "vendor",
      tc: content,
    };

    if (!editTerm) {
      try {
        const response = await axios.post(TermsAndConditionsAdd, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleTermConditionList();
        setContent("");
        toast.success(
          response.status === 201
            ? "Add Term & Condition successfully..."
            : "error"
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      handleUpdateTerms();
    }
  };

  //  Update Terms and Condition

  const handleUpdateTerms = async () => {
    const data = {
      role: "vendor",
      tc: content,
    };
    try {
      const response = await axios.patch(
        `${TermsAndConditionsUpdate}/${editTerm._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleTermConditionList();
      setContent("");
      setEditTerm(null);
      toast.success(
        response.status === 200
          ? "Updated Term & Condition successfully..."
          : "error"
      );
    } catch (error) {
      console.error(error);
    }
  };

  // delete Terms and Condition

  const handleDeleteTC = async (id) => {
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
        await axios.delete(`${TermsAndConditionsDelete}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleTermConditionList();
        Swal.fire("Deleted!", " ", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="list">
      <div className="container-fluid">
        <h2 className="mb-3">{textHeading}</h2>
        <div className="editContainer">
          <TextEditor
            onChange={handleContentChange}
            value={content}
            className="editor"
          />
        </div>
        <div className="btnContainer">
          {content == "" || content == "<p><br></p>" ? (
            ""
          ) : (
            <button
              className="btn btn-md btn-primary mb-4"
              onClick={() => saveTC()}
            >
              {!editTerm ? "Add Terms & Condition" : "Update Terms & Condition"}
            </button>
          )}
        </div>
        <div className="col-lg-12">
          <div>
            {fill.length > 0 ? (
              fill?.map((tcItem) => (
                <React.Fragment key={tcItem._id}>
                  {ReactHtmlParser(tcItem.tc)}
                  <div className="text-end mb-4">
                    <button
                      className="btn btn-md btn-success me-2"
                      onClick={() => handleUpdateText(tcItem)}
                    >
                      Set text Editor
                    </button>
                    <button
                      className="btn btn-md btn-danger"
                      onClick={() => handleDeleteTC(tcItem?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <p className="text-center">No Data Available!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorTC;
