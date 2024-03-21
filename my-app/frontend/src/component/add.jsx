// Add.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Col } from 'react-bootstrap';
import "../css/index.css"
import "bootstrap/dist/css/bootstrap.min.css";

const Add = ({ fetchAllUsers }) => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    age: "",
    imagePath: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");

    if (fileInput.files.length === 0) {
      console.error('No file selected');
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("name", inputUser.name);
    formData.append("email", inputUser.email);
    formData.append("age", inputUser.age);
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5000/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchAllUsers(); 
      setInputUser(prevState => ({
        ...prevState,
        imagePath: ""  
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="add-cont bg-dark" style={{ backgroundColor: 'rgb(148, 55, 235)', color: "white", marginBottom: "50px" }}>
      <h3>Add User</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4"className='d-flex flex-column '>

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
              // defaultValue="0"
              placeholder="Age"
              value={inputUser.age}
              onChange={handleChange}
              max="100"
              min="1"
              className='inp'
            />
            <br />
            <Form.Label className='fw-bold m-2 label'>Image Upload</Form.Label>
            <Form.Control id="fileInput" type="file" multiple name="imagePath" onChange={handleChange} />
          </Form.Group>
          <Button type="submit" className="mt-3" variant="success">Add</Button>
        </Form>
      </div>
    </>
  )
}

export default Add;
