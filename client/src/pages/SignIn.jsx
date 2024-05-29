import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const {loading,error}=useSelector((state)=>state.user)

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
    dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-xl text-white opacity-60 disabled:opacity-80 font-semibold cursor-pointer uppercase hover:opacity-100"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>

      <div className="flex gap-4">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          {" "}
          <span className="text-green-800 font-semibold">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 font-semibold mt-5">{error}</p>}
    </div>
  );
}
