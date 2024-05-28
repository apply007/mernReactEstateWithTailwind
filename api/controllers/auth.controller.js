import User from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// jwt
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  ///

  const { userName, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User save successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  ///

  const { email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = await User.findOne({ email });
    if (
      newUser != null &&
      hashPassword !== "" &&
      bcryptjs.compareSync(password, newUser.password)
    ) {
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const {password:hashPassword,...rest}=newUser._doc
      res
        .cookie("access_token", token, {
          httpOnly: true,
          
        })
        .status(200)
        .json(rest);
    } else {
      return next(errorHandler(404, "User not found or credential wrong"));
    }
  } catch (error) {
    next(error);
  }
};
