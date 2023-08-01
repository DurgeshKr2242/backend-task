import { Router } from "express";
import { createNewUser, signIn } from "../controllers/user.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", signIn);

export default router;
