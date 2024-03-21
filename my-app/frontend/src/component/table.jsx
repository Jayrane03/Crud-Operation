import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/index.css";
import Add from '../component/add';

const Tab = () => {
  const [userData, setUserData] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/read");
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getImg = (imagePath) => {
    return `http://localhost:5000/uploads/${imagePath}`; 
};


  useEffect(() => {
    fetchAllUsers();
  }, []);
const handleDelete = async (id, imagePath) => {
  try {
    
    await axios.delete(`http://localhost:5000/delete/${id}`);


    fetchAllUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
  return (
    <div className="cont">
      <Add fetchAllUsers={fetchAllUsers} />


      <Table responsive bordered size='md' className='table'>
        <thead>
          <tr className='table_row'>
            <th>Sr No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.age}</td>
              <td>
              <img
  src={getImg(item.imagePath)}
  alt="../img.jpg"
  style={{ maxWidth: '100px' }}
/>

              </td>
              <td>
                <div className="button-div d-flex m-2 justify-content-center">
                  <NavLink className="link fw-bold  font-medium m-2" to={`/update/${item._id}`}>Edit</NavLink>
                  <NavLink className="link fw-bold  font-medium m-2" onClick={()=> handleDelete(item._id)}>Delete</NavLink>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tab;
