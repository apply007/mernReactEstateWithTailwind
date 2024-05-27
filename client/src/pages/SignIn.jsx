import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/')
      } catch (error) {
        setLoading(false)
        setError(error.message)
       
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
         {loading?"Loading...":"Sign In"}
        </button>
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
