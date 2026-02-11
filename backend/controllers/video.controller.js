import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

const toPublicVideo = (v, userId) => {
  const obj = v.toObject ? v.toObject() : v;
  const likedBy = obj.likedBy || [];
  const dislikedBy = obj.dislikedBy || [];
  const out = {
    _id: obj._id,
    videoId: obj._id.toString(),
    title: obj.title,
    thumbnailUrl: obj.thumbnailUrl,
    videoUrl: obj.videoUrl,
    description: obj.description,
    channelId: obj.channel?._id?.toString() || obj.channel,
    channelName: obj.channel?.channelName || obj.channelName,
    uploader: obj.uploader?.username || obj.uploader,
    views: obj.views ?? 0,
    likes: obj.likes ?? 0,
    dislikes: obj.dislikes ?? 0,
    category: obj.category,
    uploadDate: obj.createdAt || obj.uploadDate,
    createdAt: obj.createdAt,
  };
  if (userId && (Array.isArray(likedBy) || Array.isArray(dislikedBy))) {
    const idStr = (x) => (x && x.toString ? x.toString() : x);
    out.userLiked = likedBy.some((id) => idStr(id) === userId);
    out.userDisliked = dislikedBy.some((id) => idStr(id) === userId);
  }
  return out;
};

export const getVideos = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }
    const videos = await Video.find(filter)
      .populate("channel", "channelName")
      .populate("uploader", "username")
      .sort({ createdAt: -1 });
    res.json(videos.map(toPublicVideo));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName")
      .populate("uploader", "username");
    if (!video) return res.status(404).json({ message: "Video not found" });
    video.views = (video.views || 0) + 1;
    await video.save();
    const userId = req.user?._id?.toString();
    res.json(toPublicVideo(video, userId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVideo = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user._id });
    if (!channel) {
      return res.status(400).json({ message: "Create a channel first" });
    }
    const { title, thumbnailUrl, videoUrl, description, category } = req.body;
    if (!title || !thumbnailUrl || !videoUrl || !category) {
      return res.status(400).json({
        message: "Title, thumbnailUrl, videoUrl, and category are required",
      });
    }
    const video = await Video.create({
      title: title.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      videoUrl: videoUrl.trim(),
      description: (description || "").trim(),
      category: category.trim(),
      channel: channel._id,
      uploader: req.user._id,
    });
    const populated = await Video.findById(video._id)
      .populate("channel", "channelName")
      .populate("uploader", "username");
    res.status(201).json(toPublicVideo(populated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your video" });
    }
    const { title, thumbnailUrl, videoUrl, description, category } = req.body;
    if (title !== undefined) video.title = title.trim();
    if (thumbnailUrl !== undefined) video.thumbnailUrl = thumbnailUrl.trim();
    if (videoUrl !== undefined) video.videoUrl = videoUrl.trim();
    if (description !== undefined) video.description = description.trim();
    if (category !== undefined) video.category = category.trim();
    await video.save();
    const populated = await Video.findById(video._id)
      .populate("channel", "channelName")
      .populate("uploader", "username");
    res.json(toPublicVideo(populated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your video" });
    }
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!video.likedBy) video.likedBy = [];
    if (!video.dislikedBy) video.dislikedBy = [];
    const uid = req.user._id;
    const inLiked = video.likedBy.some((id) => id.toString() === uid.toString());
    if (inLiked) {
      video.likedBy = video.likedBy.filter((id) => id.toString() !== uid.toString());
      video.likes = Math.max(0, (video.likes || 0) - 1);
    } else {
      video.likedBy.push(uid);
      video.dislikedBy = video.dislikedBy.filter((id) => id.toString() !== uid.toString());
      video.likes = (video.likes || 0) + 1;
      video.dislikes = Math.max(0, (video.dislikes || 0) - 1);
    }
    await video.save();
    res.json({
      likes: video.likes,
      dislikes: video.dislikes,
      userLiked: !inLiked,
      userDisliked: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!video.likedBy) video.likedBy = [];
    if (!video.dislikedBy) video.dislikedBy = [];
    const uid = req.user._id;
    const inDisliked = video.dislikedBy.some((id) => id.toString() === uid.toString());
    if (inDisliked) {
      video.dislikedBy = video.dislikedBy.filter((id) => id.toString() !== uid.toString());
      video.dislikes = Math.max(0, (video.dislikes || 0) - 1);
    } else {
      video.dislikedBy.push(uid);
      video.likedBy = video.likedBy.filter((id) => id.toString() !== uid.toString());
      video.dislikes = (video.dislikes || 0) + 1;
      video.likes = Math.max(0, (video.likes || 0) - 1);
    }
    await video.save();
    res.json({
      likes: video.likes,
      dislikes: video.dislikes,
      userLiked: false,
      userDisliked: !inDisliked,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
