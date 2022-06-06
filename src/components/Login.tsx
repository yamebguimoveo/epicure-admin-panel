import React, { useState } from "react";
import validator from "validator";
import { useAppDispatch } from "../store/hooks";
import { loginFunc } from "../store/slices/userSlice";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validator.isEmail(email) && password.length > 5) {
      dispatch(loginFunc({ email, password }));
    }
  };

  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  };

  const handleEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmail(newValue);
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form onSubmit={handleSubmit} className='login-page'>
          <h3>Sign In</h3>
          <div className='mb-3'>
            <label>Email address</label>
            <input
              value={email}
              type='email'
              className='form-control'
              placeholder='Enter email'
              onChange={handleEmailChange}
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input
              value={password}
              type='password'
              className='form-control'
              placeholder='Enter password'
              onChange={handlePasswordChange}
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
