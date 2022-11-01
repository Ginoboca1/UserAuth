import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContex";
import  Alert  from "./Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/UserAuth");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/UserAuth");
    } catch (error) {
      console.log(error)
      setError('Error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('We sent you an email. Check your inbox')
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.tld"
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({...user, password: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 text-black hover:bg-slate-200 shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Login with Google
      </button>
      <p className="my-4 text-sm flex justify-between px-3 text-black">
        Don't have an account?
        <Link to="/register" className="text-red-700 hover:text-blue-900">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;