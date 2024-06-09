import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  console.log(userListings);
  // Code for firebase storage
  // allow read
  // allow write: if
  // request.resource.size<2*1024*1024 &&
  // request.resource.contentType.matches('image/.*')
  //

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChanged = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setSuccessUpdate(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // delete
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // SignOut User
  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout/");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "%done");
        setFileperc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name=""
          id=""
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt={currentUser.userName}
          className="rounded-full h-24 w-24 object-cover cursor-pointer  self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading image ${filePerc}`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Uploading image successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="UserName"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.userName}
          id="userName"
          onChange={handleChanged}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChanged}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChanged}
        />
        <button
          className="bg-slate-700 p-3 rounded-lg uppercase font-semibold text-white text-lg hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>

        <Link
          className="text-white bg-green-700 p-3 rounded-lg flex justify-center font-semibold text-lg uppercase opacity-80 hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleSignOutUser}
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {successUpdate ? "Updated Successfully" : ""}
      </p>

      <button className="text-green-700 w-full" onClick={handleShowListings}>
        Show Listings
      </button>
      <p className="text-red-800 mt-5">
        {showListingsError ? `Errors showing listings` : ""}
      </p>

      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your listings</h1>
          {userListings.map((listing, index) => (
          <div
            key={listing._id}
            className="border rounded-lg p-3 flex items-center justify-between mb-4 gap-4"
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                className="h-16 w-16 object-contain rounded-lg"
                src={listing.imageUrls[0]}
                alt="listing"
              />
            </Link>

            <Link
              to={`/listing/${listing._id}`}
              className="flex-1 text-slate-700 font-semibold  hover:underline truncate"
            >
              <p>{listing.name}</p>
            </Link>

            <div className="flex flex-col it">
              <button className="text-red-700 uppercase">Delete</button>
              <button className="text-green-700 uppercase">Edit</button>
            </div>
          </div>
        ))}
        </div>
        }
    </div>
  );
}
