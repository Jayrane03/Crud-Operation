import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import tempImage from "../component/img.png";
import { NavLink } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/index.css";
import Add from '../component/add';
import { BASE_URL } from '../services/helper';

const Tab = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchAllUsers(); // Call fetchAllUsers directly within useEffect
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/crud/read`);
      setUserList(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to delete a user
  const handleDelete = async (id, name) => {
    try {
      if (window.confirm(`Are you sure want to delete ${name}?`)) {
        await axios.delete(`${BASE_URL}/crud/delete/${id}`);
        const updatedUserList = userList.filter(user => user._id !== id);
        setUserList(updatedUserList);
        alert(`${name} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    window.location.href = "/login";
   window.confirm("Are you sure want to logout")
  };

  // Function to get image path
  const getImg = (imagePath) => {
    return `http://localhost:5001/crud/uploads/${imagePath}`;
  };

  return (
    <div className="cont">
      <div className="log_out">
        <button onClick={handleLogout}>Logout</button>
      </div>
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
          {userList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.age}</td>  
              
             <td>
  {item.imagePath ? (
    <img
      src={getImg(item.imagePath)}
      alt = { getImg(item.imagePath)}
      style={{ maxWidth: '100px' }}
    />
  ) : (
    <img
      src= {tempImage}
      alt={getImg(item.imagePath)}
      style={{ maxWidth: '100px' }}
    />
  )}
</td>

              <td>
                <div className="button-div d-flex m-2 justify-content-center">
                  <NavLink className="link fw-bold font-medium m-2" to={`/update/${item._id}`}>Edit</NavLink>
                  <button className="link fw-bold font-medium m-2 border-0 text-center p-1" onClick={() => handleDelete(item._id, item.name)}>Delete</button>
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
