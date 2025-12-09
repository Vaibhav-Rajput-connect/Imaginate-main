import express from "express";
import { generateImage, getUserImages } from "../controllers/imageControllers.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate-image", userAuth, generateImage);
router.get("/user-images", userAuth, getUserImages);

export default router;
