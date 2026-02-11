import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    if (!channelName || !channelName.trim()) {
      return res.status(400).json({ message: "Channel name is required" });
    }
    const existing = await Channel.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "You already have a channel" });
    }
    const channel = await Channel.create({
      channelName: channelName.trim(),
      owner: req.user._id,
      description: (description || "").trim(),
      channelBanner: (channelBanner || "").trim(),
    });
    const populated = await Channel.findById(channel._id).populate("owner", "username email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user._id })
      .populate("owner", "username email");
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("owner", "username email");
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({ channel: req.params.id })
      .populate("channel", "channelName")
      .populate("uploader", "username")
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
