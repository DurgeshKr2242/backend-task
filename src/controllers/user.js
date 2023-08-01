import jwt from "jsonwebtoken";
import { comparePassword, createJWT, hashPassword } from "../helper/index.js";

import { USERS } from "../server.js";

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check if uesr is present
  if (!name || !email || !password) {
    res.json({ message: "All fields are required" });
    return;
  }

  if (ValidateEmail(email) == false) {
    res.status(401).json({ message: "Email is not valid" });
    return;
  }

  if (password.length < 6) {
    res
      .status(401)
      .json({ message: "Password must be atleast 6 characters long" });
    return;
  }

  const alreadyExist = USERS.filter((us) => us.email == email);

  if (alreadyExist.length > 0) {
    return res.status(403).json({ message: "User already exist" });
  }

  const hashedPasswrod = await hashPassword(password);
  const user = {
    name,
    email,
    password: hashedPasswrod,
  };
  USERS.push(user);
  // Create the user in db

  const token = await createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = USERS.filter((us) => us.email == email);
  // CHECK IF USER EXISTS
  console.log(user[0]);
  if (user.length == 0) {
    res.status(401).json({ message: "User with this email id doesnot exist" });
    return;
  }

  const isValid = await comparePassword(password, user[0].password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = createJWT(user[0]);
  res.json({ token });
};
