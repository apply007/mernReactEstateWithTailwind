import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      {" "}
      <div className="p-7 border-b-2 md:border-r-2">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term</label>
            <input
              className="border rounded-lg p-3 w-full"
              type="text"
              placeholder="Search..."
              id="searchTerm"
            />
          </div>
          {/* type */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type : </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent </span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="other" className="w-5" />
              <span>Other </span>
            </div>
          </div>
          {/* amenities */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities : </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished </span>
            </div>
          </div>

          {/* sort */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort : </label>
            <select id="sort_order" className="border rounded-lg outline-none p-3">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg p-3 font-semibold text-white uppercase hover:opacity-95">Search</button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Result : </h1>
      </div>
    </div>
  );
}
