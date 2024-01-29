import React from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './adduser.scss';

export default function AddUser() {
  return (
    <button
      type="button"
      className="adduser btn btn-md btn-primary"
    >
      <PersonAddAltIcon className="icon me-2" />
      AddUser
    </button>
  );
}
