import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";

import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import "swiper/css/bundle";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use(Navigation);
  const param = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser._id,listing?.userRef)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const listingId = param.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);

        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchListings();
  }, [param.listingId]);

  return (
    <main>
      {loading && (
        <p className="text-center text-3xl font-bold mt-7 text-slate-400 p-3">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-red-900 text-center font-semibold mt-56 text-xl uppercase border-red-500 shadow-lg p-10 rounded-lg">
          Something went wrong - {error}
        </p>
      )}

      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((imageUrl) => (
              <SwiperSlide key={imageUrl}>
                <div
                  className="h-[550px]"
                  style={{ background: `url(${imageUrl}) center no-repeat` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col items-center justify-center">
            <h1 className="w-full text-2lg font-bold text-center p-2 rounded-md">
              {listing.name} -
            </h1>
            <h1 className="w-full max-w-[200px] text-2lg font-bold text-center p-2 rounded-md">
              <span className="text-slate-800 font-semibold text-lg underline">
                {" "}
                Price/Rent{" "}
              </span>{" "}
              : BDT {listing.regularPrice.toLocaleString("en-US")} / Month
            </h1>
          </div>

          <div className="flex justify-center gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>

            {listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                BDT{" "}
                {(
                  +listing.regularPrice - +listing.discountPrice
                ).toLocaleString("en-US")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-items-center p-5">
            <p className="text-slate-700">
              {" "}
              <span className="font-semibold text-black">
                <b>Description - </b>
                {listing.description} Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Illum nisi voluptas, rerum dicta reprehenderit
                nihil totam! Molestias eius id fugiat enim, qui explicabo
                incidunt. Beatae iusto aspernatur ullam magni vitae!
              </span>
            </p>

            <ul className="flex flex-wrap text-green-700 text-sm font-semibold gap-4 sm:gap-6">
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBed />
                {listing.bedrooms > 1
                  ? `${listing.bedRooms} Beds`
                  : `${listing.bedRooms} Bed`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBath />
                {listing.bathrooms > 1
                  ? `${listing.bathRooms} Baths`
                  : `${listing.bathRooms} Bath`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaParking />
                {listing.parking ? "Parking spot" : "No Parking spot"}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaChair />
                {listing.furnished ? `Furnished` : `Not Furnished`}
              </li>
            </ul>
          </div>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className="uppercase flex justify-center border p-2 sm:w-[50%] ml-28 sm:ml-72 font-semibold italic hover:opacity-80 rounded-lg text-white bg-slate-700 items-center"
            >
              Contact LandLord
            </button>
          )}

          {contact && <Contact listing={listing} />}
        </>
      )}
    </main>
  );
}
