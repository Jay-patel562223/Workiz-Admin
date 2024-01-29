import { toast } from "react-toastify";
import {
  deleteUser,
  searchUser,
  setUser,
  totalUserData,
} from "../../../helper/apiConfig";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_LIST,
  FETCH_USER_SUCCESS,
  DELETE_USER_LIST,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../../actionType/AllUserType";
import axios from "axios";

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USER_LIST" });
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(totalUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      dispatch(fetchTotalSuccess(data?.users));
    } catch (error) {
      dispatch({ type: "FETCH_USER_FAILURE", payload: error.message });
    }
  };
};

export const addUsers = (newData) => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(setUser, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "ADD_USER_SUCCESS", payload: response.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "ADD_USER_FAILURE", payload: error });
    }
  };
};

export const deleteUsers = (userId) => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios
        .delete(`${deleteUser}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({ type: "DELETE_USER_LIST", payload: userId });

          dispatch(fetchUser());
        });
    } catch (error) {
      toast.error(error);
      console.log("error", error);
    }
  };
};

export const setSearch = (searchParams) => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        searchUser,
        { find: searchParams },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchTotalSuccess(response?.data?.user || []));
    } catch (error) {
      dispatch({ type: "SET_SEARCH_ERROR", payload: error.message });
    }
  };
};

export const addUserData = () => ({
  type: ADD_USER,
});

export const addUserDataSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const addUserDataFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error,
});

export const deleteData = (userId) => ({
  type: DELETE_USER_LIST,
  payload: userId,
});

export const fetchTotalUser = () => ({
  type: FETCH_USER_LIST,
});
export const fetchTotalSuccess = (data) => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});

export const fetchTotalFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});
