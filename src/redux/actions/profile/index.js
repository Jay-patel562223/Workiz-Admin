import { adminDetails } from "../../../helper/apiConfig";
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_DATA,
  FETCH_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE,
} from "../../actionType/ProfileType";
import axios from "axios";

export const fetchProfile = () => {
  return async (dispatch) => {
      const token = JSON.parse(localStorage.getItem("token"));
    dispatch({ type: "FETCH_PROFILE_DATA" });
    try {
      const response = await axios.get(adminDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "FETCH_PROFILE_SUCCESS", payload: response.data.admin });
    } catch (error) {
      dispatch({ type: "FETCH_PROFILE_FAILURE", payload: error.message });
    }
  };
};

export const updateAdminProfile = (data) => ({
  type: UPDATE_ADMIN_PROFILE,
  payload: data,
});

export const fetchProfileData = () => ({
  type: FETCH_PROFILE_DATA,
});
export const fetchProfileSuccess = (data) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});
