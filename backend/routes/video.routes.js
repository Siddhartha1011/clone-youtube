import express from "express";
import protect, { optionalProtect } from "../middlewares/auth.middleware.js";
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", getVideos);
router.get("/:id", optionalProtect, getVideoById);
router.post("/", protect, createVideo);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);

export default router;
