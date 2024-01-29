import './new.scss';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUsers } from '../../redux/actions/Alluser';


const New = () => {
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');


  const navigate = useNavigate();
 
  const dispatch = useDispatch();

  const setData = useSelector((state) => state)

  console.log("AddData",setData); 
  console.log("AddData listin------",addUsers); 


  useEffect((addData) =>{
    dispatch(addUsers(addData))
  },[dispatch])

  
  const handlerSubmit = (event) =>{
     event.preventDefault()
    
     const user = {
       name,
       file,
       email,
       address,
     };
 
     addUsers(user);
 
     setName('');
     setFile('');
     setAddress('');
     setEmail('');
     navigate('/users')
  }

  return (
    <div className="new container">
      <div className="newContainer">
          <h1>Add New User</h1>
        <div className="add-user-section">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <div className='card add-user-card'>
              <form  className="row g-3" onSubmit={handlerSubmit}>
                <div className="formInput">
                <label htmlFor="file" className='uploadeIcon'>
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                </div>
              <div  className="col-md-6">
                    <label htmlFor="name"  className="form-label">Name</label>
                    <input type="text"  className="form-control" id="name" placeholder='name' value={name} onChange={(e)  => setName(e.target.value)}  />
                  </div>
                  <div  className="col-md-6">
                    <label htmlFor="uemail"  className="form-label">Email</label>
                    <input type="email"  className="form-control" id="uemail" placeholder='lorem@gmail.com' values={email}  onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div  className="col-md-12">
                    <label htmlFor="inputState"  className="form-label">User Type</label>
                    <select   className="form-select"   name="Users" id="users" >
                        <option value="Customer">Customer</option>
                      <option value="Vendor">Vendor</option>
                      <option value="Customer + Vendor">Customer + Vendor</option>
                    </select>
                  </div>
                  {/* <div  className="col-md-4">
                    <label htmlFor="pNumber"  className="form-label">Phone Number</label>
                    <input type="tel"  className="form-control" id="pNumber"  pattern="[0-9]{10}" onChange={handleChange} />
                  </div> */}
                  <div  className="mb-3 col-12">
                    <label htmlFor="uAddress"  className="form-label">Address</label>
                    <textarea  className="form-control" id="uAddress" rows="3" placeholder="A-44,gurukul road,near mall" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                  </div>
                  <div  className="col-12">
                    <button type="submit"  className=" addBtn">  <PersonAddAltOutlinedIcon className='me-2' /> Add user</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
