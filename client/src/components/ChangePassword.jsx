import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlerPassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault(); // Insert product data
      const response = await API.patch("/changepassword", password);
      console.log("SUCCESS CHANGE PASSWORD", response.data);

      if (password.new_password !== password.confirm_password) {
        return alert("new password and confirmation do not match!!!");
      }

      alert("successfuly change password!"); // navigate("/product-admin");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="m-4 mt-0">
        <h3 className="fw-bold text-center my-5">Change Password</h3>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" htmlFor="old_password">
            <Form.Label className="fw-bold">Old Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              id="old_password"
              type="password"
              placeholder=" Old Password"
              name="old_password"
              value={password.old_password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-bold">New Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              type="password"
              placeholder="New Password"
              name="new_password"
              value={password.new_password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-bold"> Confirm New Password</Form.Label>
            <Form.Control
              onChange={handlerPassword}
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              value={password.confirm_password}
            />
          </Form.Group>
          <Button type="submit" className="w-100">Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
