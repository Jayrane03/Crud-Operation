import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/helper';

const Update = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    age: "",
    imagePath: "",
  });

  const { id } = useParams();

  const fetchUpdate = useCallback(async () => {
    try {
      const res = await axios.put(`${BASE_URL}/crud/update/${id}`);
      setInputUser({
        name: res.data.name,
        email: res.data.email,
        age: res.data.age,
        imagePath: res.data.imagePath,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUpdate();
  }, [fetchUpdate]);

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

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
      const res = await axios.put(`http://localhost:5001/crud/update/${id}`, formData, {
        headers: {
          'Content-Type': ' '
        }
      });
      console.log(res);
      if (res.status === 200) {
        
        window.location = "/home2";
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-cont bg-dark d-block m-auto w-20 text-light">
      <h3>Update User</h3>
      <Form onSubmit={handleSubmit}  encType="multipart/form-data">
        <Form.Group as={Col} md="4" className='d-flex justify-content-center flex-column  form'>
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
          <Form.Label className='fw-bold m-2 label'>Image Upload</Form.Label>
          <Form.Control id="fileInput" type="file" multiple name="imagePath" onChange={handleChange} />
          <Button type="submit" className="mt-3 btn_up" variant="success">Update</Button>
        </Form.Group>
       
      </Form>
    </div>
  );
}

export default Update;
