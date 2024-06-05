import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setImageUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Set image failed size (2mb max)");
          setImageUploading(false);
        });
    } else {
      setImageUploadError("You can set 6 images listing");
    }
   
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) =>  i != index),
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
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
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">
        Create a Listing
      </h1>

      <form className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div>
                {" "}
                <p>Regular Price</p>
                <small>($ / month)</small>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border border-gray-300 rounded-lg"
                id="discountedPrice"
                min="1"
                max="10"
                required
              />
              <div>
                <p>Discounted Price</p>
                <small>($ / month)</small>
              </div>
            </div>
          </div>
        </div>
        {/* right column */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <button
              className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80"
              onClick={handleImageSubmit}
              disabled={imageUploading}
            >
              {imageUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                {" "}
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 disabled:opacity-80 text-white uppercase rounded-lg opacity-80 text-lg hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
