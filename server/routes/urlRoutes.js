import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import * as url from "../controllers/urlController.js";
import createShortUrlLimiter from "../middlewares/rateLimit.js";

const router = Router();

router.post("/shorten", isAuthenticated, createShortUrlLimiter, url.shorten);
router.get("/:shortId", url.redirect);

export default router;