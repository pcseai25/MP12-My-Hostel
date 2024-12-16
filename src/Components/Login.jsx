import axios from 'axios';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    if (user.email && user.password) {
      try {
  console.log(user)
        const response = await axios.post('http://localhost:8080/api/v1/users/login',user);
        console.log(response.data)
        localStorage.setItem('token', response.data.token); // Store the JWT token
        navigate('/'); // Redirect to the homepage or dashboard
      } catch (err) {
        setError('Invalid email or password');
      }
    }
    else console.log('if not worked')
  }

  return (
    <div className="flex">
      <div className="bg-blue-900 text-white p-8 w-1/2 h-screen flex flex-col justify-center">
        <h2 className="text-3xl mb-8 font-display">In a hostel, you don't just <br /> share a room; you share stories, laughter, and memories....</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-grow">
        <div className="w-96 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Welcome to My Hostel Portal</h3>
          <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="w-full relative mb-4">
            <label className="font-semibold" htmlFor="email">College Email Id </label>
            <input type="email" name="email" required value={user.email} onChange={handleInput} autoComplete='off' placeholder="Enter Email Id" className="pl-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <MdEmail className="absolute mt-3 top-1/2 transform -translate-y-2 left-2 text-gray-400" />
          </div>
          <div className="w-full relative mb-6">
            <label className="font-semibold" htmlFor="password">Password</label>
            <input type={visible ? "text" : "password"} name="password" placeholder="Enter Password" required value={user.password} onChange={handleInput} className="pl-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <RiLockPasswordFill className="absolute top-1/2 transform translate-y left-2 text-gray-400" />
            <div className="absolute top-1/2 mx-[22rem] mt-1" onClick={() => setVisible(!visible)}>
              {
                visible ? <FaRegEyeSlash style={{ color: 'gray' }} /> : <FaRegEye style={{ color: 'gray' }} />
              }
            </div>
          </div>
          <button type='submit' className="text-lg w-96 font-semibold text-white bg-blue-500 border border-transparent px-6 py-2 rounded-2xl hover:bg-white hover:text-blue-500 hover:border-blue-500 transition duration-300 ease-in-out">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
