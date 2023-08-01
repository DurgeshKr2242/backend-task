import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = (user) => {
  const token = jwt.sign(user, "OURJWTSECRETINENV");
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "User is not authenticaed" });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json("Not authorized");
  }

  try {
    const payload = jwt.verify(token, "OURJWTSECRETINENV");
    req.user = payload;
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};
