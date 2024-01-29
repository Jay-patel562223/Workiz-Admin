import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/actions/Alluser';

const Search = () => {
    const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();
  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(setSearch(searchUser));
  }, [searchUser, dispatch]);
  return (
    <React.Fragment>
             <form className="d-flex" role="search" onSubmit={handlerSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </form>
    </React.Fragment>
  )
}

export default Search;