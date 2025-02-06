import express from "express";
import {
  handleLoginUser,
  handleProfile,
  handleRegisterUser,
} from "../controller/user";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.get("/profile", isAuthenticated, handleProfile);

export default router;
