import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate("user", "username")
      .sort({ createdAt: 1 });
    res.json(
      comments.map((c) => ({
        commentId: c._id.toString(),
        userId: c.user?._id?.toString(),
        user: c.user?.username || "Unknown",
        text: c.text,
        timestamp: c.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    const comment = await Comment.create({
      video: video._id,
      user: req.user._id,
      text: text.trim(),
    });
    const populated = await Comment.findById(comment._id).populate("user", "username");
    res.status(201).json({
      commentId: populated._id.toString(),
      userId: populated.user?._id?.toString(),
      user: populated.user?.username || "Unknown",
      text: populated.text,
      timestamp: populated.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your comment" });
    }
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    comment.text = text.trim();
    await comment.save();
    const populated = await Comment.findById(comment._id).populate("user", "username");
    res.json({
      commentId: populated._id.toString(),
      userId: populated.user?._id?.toString(),
      user: populated.user?.username || "Unknown",
      text: populated.text,
      timestamp: populated.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your comment" });
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
