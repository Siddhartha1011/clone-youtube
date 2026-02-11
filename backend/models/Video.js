import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, default: "" },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

videoSchema.index({ channel: 1 });
videoSchema.index({ title: "text" });
videoSchema.index({ category: 1 });

const Video = mongoose.model("Video", videoSchema);
export default Video;
