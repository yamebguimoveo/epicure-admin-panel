import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { signup } from "../services/signup";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validator.isEmail(email) && password.length > 5 && name.length > 5) {
      await signup({ name, email, password });
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form onSubmit={handleSubmit} className='login-page'>
          <h3>Sign In</h3>
          <div className='mb-3'>
            <label>Name</label>
            <input
              minLength={5}
              value={name}
              type='name'
              className='form-control'
              placeholder='Enter name'
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className='mb-3'>
            <label>Email address</label>
            <input
              value={email}
              type='email'
              className='form-control'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input
              minLength={5}
              value={password}
              type='password'
              className='form-control'
              placeholder='Enter password'
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
