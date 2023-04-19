import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/shorten", isAuthenticated, (req, res) => {
    
  res.send("hello world  ");
});

export default router;