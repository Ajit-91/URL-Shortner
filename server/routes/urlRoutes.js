import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import * as url from "../controllers/urlController.js";

const router = Router();

router.post("/shorten", isAuthenticated, url.shorten);
router.get("/:shortId", url.redirect);

export default router;