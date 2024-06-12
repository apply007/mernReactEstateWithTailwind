import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listings = await Listing.create(req.body);
    console.log(req.body);
    return res.status(201).json(listings);
  } catch (error) {
    next(error);
  }
};

// delete listing
export const deleteListing = async (req, res, next) => {
  try {
    const listings = await Listing.findById(req.params.id);
    console.log(req);
    if (!listings) {
      return next(errorHandler(404, "listings not found"));
    }

    if (req.user.id != listings.userRef) {
      return next(errorHandler(404, "You can delete your own listings"));
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted");
  } catch (error) {
    next(error);
  }
 
};


 // update listing
 export const updateListing = async (req, res, next) => {
    try {
      const listings = await Listing.findById(req.params.id);
      console.log(req);
      if (!listings) {
        return next(errorHandler(404, "listings not found"));
      }

      if (req.user.id != listings.userRef) {
        return next(errorHandler(404, "You can update your own listings"));
      }
    const updatedListings=  await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
      res.status(200).json(updatedListings);
    } catch (error) { 
      next(error);
    }
  };