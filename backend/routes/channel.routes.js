import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createChannel,
  getMyChannel,
  getChannelById,
  getChannelVideos,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/me", protect, getMyChannel);
router.get("/:id", getChannelById);
router.get("/:id/videos", getChannelVideos);

export default router;
