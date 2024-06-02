import React from "react";

export default function CreateListing() {
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
              <div >
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
          <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6)</span>
         </p>
          
        <div className="flex gap-4">
          <input type="file" id="images" multiple  className="p-3 border border-gray-300 rounded w-full"/>
      <button className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
        </div>

     
        <button className="p-3 bg-slate-700 disabled:opacity-80 text-white uppercase rounded-lg opacity-80 text-lg hover:opacity-95">Create Listing</button>
        
        </div> 
      
      </form>
    </main>
  );
}
