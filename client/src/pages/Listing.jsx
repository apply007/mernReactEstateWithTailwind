import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use(Navigation);
  const param = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
                <div className="h-[550px]" style={{background:`url(${imageUrl}) center no-repeat`}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
