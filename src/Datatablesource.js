import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { BsPersonLock } from "react-icons/bs";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { CgUnblock  } from "react-icons/cg";
import { VscGroupByRefType } from "react-icons/vsc";
import { TbBrandReason } from "react-icons/tb";
import { MdSwitchAccount } from "react-icons/md";
import customerIcon from "./assets/images/Customer.png";
import vendorIcon from "./assets/images/Vendor.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const imgUrl = 'http://181.215.78.241:5000';


export const userColumns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'user',
    headerName: 'Name',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120,
  },
  
];

export const sidebarMenu =[{
  id:0,
  link:"/",
  title:"Dashboard",
  icon: <DashboardOutlinedIcon className='icon' />
},
{
  id:1,
  link:"/customer",
  title:"Customers",
  icon: <img src={customerIcon} alt="customerIcon" className='' style={{width:"22px", height:"auto"}} />
},

,{
  id:2,
  link:"/vendor",
  title:"Vendor",
  icon: <img src={vendorIcon} alt="vendorIcon" className='sidebarIcon' style={{width:"22px", height:"auto"}} />
},

{
  id:3,
  link:"/customer&vendor",
  title:"Customers & Vendor",
  icon: <SupervisedUserCircleOutlinedIcon  className='icon'/>
},{
  id:4,
  link:"/category",
  title:"Categories",
  icon: <CategoryOutlinedIcon  className='icon'/>
},
{
  id:5,
  link:"/block",
  title:"BLock & Report",
  icon: <BsPersonLock  className='icon'/>
},
{
  id:6,
  link:"/role",
  title:"Add Role",
  icon: <AiOutlinePlusCircle  className='icon'/>
},
{
  id:7,
  link:"/reason",
  title:"Reason master",
  icon: <TbBrandReason  className='icon'/>
},
{
  id:8,
  link:"/accountrequest",
  title:"New Account Request",
  icon: <MdSwitchAccount className='icon'/>
},
{
  id:9,
  link:"/Faqs",
  title:"FAQ's",
  icon: <QuizOutlinedIcon  className='icon'/>
},{
  id:10,
  link:"/contactus",
  title:"Contact us",
  icon: <ContactsOutlinedIcon  className='icon'/>
},
];


