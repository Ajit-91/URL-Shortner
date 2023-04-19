import { Router } from "express";
import * as user from "../controllers/userController.js";

const router = Router();

router.post("/register", user.register);

export default router;