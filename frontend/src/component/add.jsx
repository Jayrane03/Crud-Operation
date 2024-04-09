import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Col } from 'react-bootstrap';
import "../Styles/index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from '../services/helper';

const Add = ({ fetchAllUsers }) => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    age: "",
    imagePath: null,
    password: "placeholder",
  });

  const [imagePreview, setImagePreview] = useState(null); // State to hold the URL of the selected image

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputUser({
      ...inputUser,
      [name]: value
    });
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setInputUser({
      ...inputUser,
      imagePath: file
    });

    // Display image preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!inputUser.imagePath) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append("name", inputUser.name);
    formData.append("email", inputUser.email);
    formData.append("age", inputUser.age);
    formData.append("image", inputUser.imagePath);
    formData.append("password", inputUser.password);
  
    try {
      const response = await axios.post(`${BASE_URL}/crud/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201) {
        setInputUser({
          name: "",
          email: "",
          age: "",
          imagePath: null,
          password: "placeholder",
        });
        document.getElementById("fileInput").value = ""; // Reset file input value
        setImagePreview(null); // Reset image preview
        console.log('User added successfully:', response.data);
  
        // Fetch all users only after successful user addition
        fetchAllUsers();
      } else {
        console.error('Failed to add user. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  return (
    <>
    
    <div className="add-cont bg-dark" style={{ backgroundColor: 'rgb(148, 55, 235)', color: "white", marginBottom: "50px" }}>
      <h3>Add User</h3>
      <Form onSubmit={handleSubmit}  encType="multipart/form-data/">
        <Form.Group as={Col} md="4" className='d-flex flex-column form'>
          <Form.Label className='fw-bold m-2 label'>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={inputUser.name}
            placeholder="First name"
            onChange={handleChange}
            className='inp'
          />
          <br />
          <Form.Label className='fw-bold m-2 label'>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={inputUser.email}
            placeholder="Email"
            onChange={handleChange}
            className='inp'
          />
          <br />
          <Form.Label className='fw-bold m-2 label'>Age</Form.Label>
          <Form.Control
            required
            type="number"
            name="age"
            placeholder="Age"
            value={inputUser.age}
            onChange={handleChange}
            max="100"
            min="1"
            className='inp'
          />
          <br />
          <Form.Label className='fw-bold m-2 label'>Image Upload</Form.Label>
          <Form.Control id="fileInput" type="file" multiple name="imagePath" onChange={handleFileChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px' }} />} {/* Display image preview */}
        </Form.Group>
        <Button type="submit" className="mt-3" id="add_btn_1"variant="success">Add</Button>
      </Form>
    </div>
    </>
  )
} 

export default Add;
