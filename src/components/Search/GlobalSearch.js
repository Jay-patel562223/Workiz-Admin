import React, { useEffect, useState } from "react";
import { GlobalSerch } from "../../helper/apiConfig";
import Form from "react-bootstrap/Form";
import axios from "axios";

const GlobalSearch = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchDataList, setSearchDataList] = useState("");

  useEffect(() => {
    handleSearchData();
  }, []);

  const handleSearchData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        GlobalSerch,
        { find: searchList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSearchList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredEmployees = searchList?.filter((searchValues) => {
    return Object.values(searchValues)
      .join("")
      .toLowerCase()
      .includes(searchDataList.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchDataList(e?.target?.value);
  };

  return (
    <React.Fragment>
      <div>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleSearch}
        />
      </div>
    </React.Fragment>
  );
};

export default GlobalSearch;
