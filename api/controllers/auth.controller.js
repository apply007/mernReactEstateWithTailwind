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
      const { password: hashPassword, ...rest } = newUser._doc;
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



export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user !== null) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: userPass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newGeneratedHashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = User({
        userName:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: newGeneratedHashPassword,
        avatar:req.body.photo,
      });
      await newUser.save();

      // jwt auth
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: userPass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);

    }
  } catch (error) {
    next(error);
  }
};
