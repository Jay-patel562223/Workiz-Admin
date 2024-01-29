import React, { useEffect, useState } from "react";
import { RoleChangeList, UpdateRole } from "../../helper/apiConfig";
import axios from "axios";
import "./roleChange.scss";
import "../Unblock/unblock.scss";
import { toast } from "react-toastify";

const RoleChange = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const RoleHeading = "Add Role";
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    handlerRoleChange();
  }, []);

  //   Role listing

  const handlerRoleChange = async () => {
    await axios
      .get(RoleChangeList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRoleList(res?.data?.list);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // update  role

  const handleUpdateRole = async (roleListItem) => {
    const data = {
      id: roleListItem?.userId?._id,
      role: roleListItem?.role,
    };
    await axios
      .patch(UpdateRole, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res?.data?.mess);
      })
      .catch((error) => {
        toast.error(error.error);
      });
    handlerRoleChange();
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-3 text-capitalize">{RoleHeading}</h2>
          <div className="card main-list-card border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                {/* <h3 className="mb-0">Current Role</h3> */}
              </div>
              <div className="row">
                {roleList.length > 0 ? (
                  roleList?.map((roleListItem) => {
                    return (
                      <div
                        className="col-md-12 col-lg-4"
                        key={roleListItem?._id}
                      >
                        <div className="block-list-wrapper mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <h5 className="mb-0 text-capitalize">
                              {roleListItem?.userId?.name || "demo"}
                            </h5>
                            <span>
                              {new Date(
                                `${roleListItem?.createdAt}`
                              ).toLocaleDateString()}{" "}
                              &nbsp;
                              {new Date(
                                `${roleListItem?.createdAt}`
                              ).toLocaleTimeString("en-US")}
                            </span>
                          </div>
                          <span className="type">
                            Current role :{" "}
                            {roleListItem?.userId?.current_role || "lorem"}
                          </span>
                          <span className="type">
                            change Request role :{" "}
                            {roleListItem?.role || "lorem"}
                          </span>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-md btn-primary text-capitalize"
                              onClick={() => handleUpdateRole(roleListItem)}
                            >
                              Add role
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3 className="text-center">No Data Available!</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoleChange;
