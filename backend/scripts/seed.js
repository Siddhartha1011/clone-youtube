import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

dotenv.config();

const sampleVideos = [
  {
    title: "Big Buck Bunny – Open Animation Film",
    thumbnailUrl: "https://img.youtube.com/vi/YE7VzlLtp-4/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Big Buck Bunny is a short animated film showcasing open-source animation quality.",
    category: "Entertainment",
    views: 1250000,
  },
  {
    title: "Elephant Dream – Open Source Movie",
    thumbnailUrl: "https://img.youtube.com/vi/eRsGyueVLvQ/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Elephant Dream is the first open movie made entirely with open-source tools.",
    category: "Entertainment",
    views: 980000,
  },
  {
    title: "Fire & Explosion VFX Demo",
    thumbnailUrl: "https://img.youtube.com/vi/0y1C1h2x8Kc/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "A visual effects demo showcasing fire, smoke, and explosion rendering.",
    category: "IT & Software",
    views: 760000,
  },
  {
    title: "Action Escape Scene – Cinematic Demo",
    thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "A cinematic escape scene used to test video quality and motion rendering.",
    category: "Entertainment",
    views: 450000,
  },
  {
    title: "Colorful Animation Short",
    thumbnailUrl: "https://img.youtube.com/vi/SkVqJ1SGeL0/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "A vibrant animated short focused on colors, motion, and smooth playback.",
    category: "Entertainment",
    views: 620000,
  },
  {
    title: "High-Speed Driving Action",
    thumbnailUrl: "https://img.youtube.com/vi/JVb2s9KJj4s/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "Fast-paced driving footage designed to test high-motion video playback.",
    category: "Sports",
    views: 880000,
  },
  {
    title: "Stress Test – Visual Effects",
    thumbnailUrl: "https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "A stress-test video highlighting rendering load and visual complexity.",
    category: "IT & Software",
    views: 2100000,
  },
  {
    title: "Sintel – Fantasy Animation Film",
    thumbnailUrl: "https://img.youtube.com/vi/eRsGyueVLvQ/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description: "Sintel is an open-source fantasy short film with cinematic storytelling.",
    category: "Entertainment",
    views: 1300000,
  },
  {
    title: "Tears of Steel – Sci-Fi Short",
    thumbnailUrl: "https://img.youtube.com/vi/R6MlUcmOul8/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "A science-fiction short film combining live action and CGI.",
    category: "Entertainment",
    views: 540000,
  },
  {
    title: "Subaru Outback – Driving Showcase",
    thumbnailUrl: "https://img.youtube.com/vi/Tn0u6F6NfYw/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    description: "A driving showcase highlighting performance on road and dirt.",
    category: "Sports",
    views: 470000,
  },
  {
    title: "Pro Gaming Highlights 2024",
    thumbnailUrl: "https://img.youtube.com/vi/YE7VzlLtp-4/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "Best moments from the 2024 competitive gaming season.",
    category: "Gaming",
    views: 320000,
  },
  {
    title: "Tech News Weekly Roundup",
    thumbnailUrl: "https://img.youtube.com/vi/eRsGyueVLvQ/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "This week's top stories in technology and software.",
    category: "News",
    views: 180000,
  },
];

async function seed() {
  await connectDB();

  const existing = await User.findOne({ email: "seed@example.com" });
  if (existing) {
    console.log("Seed data already exists. Exiting.");
    process.exit(0);
  }

  const user1 = await User.create({
    username: "SeedUser",
    email: "seed@example.com",
    password: "password123",
  });

  const user2 = await User.create({
    username: "DemoCreator",
    email: "demo@example.com",
    password: "password123",
  });

  const channel1 = await Channel.create({
    channelName: "Blender Foundation",
    owner: user1._id,
    description: "Open-source animation and 3D content.",
    subscribers: 5200,
  });

  const channel2 = await Channel.create({
    channelName: "Tech & Sports Channel",
    owner: user2._id,
    description: "Tech reviews and sports highlights.",
    subscribers: 3100,
  });

  const categories = ["Entertainment", "IT & Software", "Sports", "Gaming", "News", "Computers"];
  const videos = [];
  for (let i = 0; i < sampleVideos.length; i++) {
    const v = sampleVideos[i];
    const channel = i % 2 === 0 ? channel1 : channel2;
    const uploader = channel.owner;
    const video = await Video.create({
      title: v.title,
      thumbnailUrl: v.thumbnailUrl,
      videoUrl: v.videoUrl,
      description: v.description,
      category: v.category || categories[i % categories.length],
      channel: channel._id,
      uploader,
      views: v.views || 0,
    });
    videos.push({ video, channel, uploader });
  }

  await Comment.create({
    video: videos[0].video._id,
    user: user2._id,
    text: "Great video! Very helpful.",
  });

  console.log("Seed complete: 2 users, 2 channels,", videos.length, "videos, 1 comment.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
