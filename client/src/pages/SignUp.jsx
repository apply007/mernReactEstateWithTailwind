import React from "react";
import {Link} from "react-router-dom"

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="User Name"
          className="p-3 border rounded-lg"
          id="userName"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="password"
        />
        <button
          
          type="button"
          className="bg-slate-700 p-3 rounded-lg text-xl text-white opacity-60 disabled:opacity-80 font-semibold cursor-pointer uppercase hover:opacity-100"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-4">
        <p>Have an account?</p>
        <Link to={'/sign-in'}> <span className="text-green-800 font-semibold">Sign In</span></Link>
      </div>
    </div>
  );
}
