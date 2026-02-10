import { useMemo, useState } from "react";
import VideoCard from "../components/VideoCard";
import "../styles/video.css";

const categories = ["All","Gaming","Entertainment","Sports","Computers","IT & Software","News",
  ];

  const sampleVideos = [
    {
      videoId: "G3e-cpL7ofc",
      title: "Gaming Setup Tour 2025 - Budget to Pro",
      thumbnailUrl: "https://img.youtube.com/vi/G3e-cpL7ofc/hqdefault.jpg",
      channelName: "TechSource",
      views: 1250000,
      category: "Gaming",
    },
    {
      videoId: "L_b0P2p0Z9c",
      title: "Top 10 Games You Must Play This Year",
      thumbnailUrl: "https://img.youtube.com/vi/L_b0P2p0Z9c/hqdefault.jpg",
      channelName: "IGN",
      views: 980000,
      category: "Gaming",
    },
    {
      videoId: "HluANRwPyNo",
      title: "Funniest Moments Compilation",
      thumbnailUrl: "https://img.youtube.com/vi/HluANRwPyNo/hqdefault.jpg",
      channelName: "Comedy Central",
      views: 5400000,
      category: "Entertainment",
    },
    {
      videoId: "e-ORhEE9VVg",
      title: "Behind The Scenes: Music Video Making",
      thumbnailUrl: "https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg",
      channelName: "Vevo",
      views: 2200000,
      category: "Entertainment",
    },
    {
      videoId: "dQw4w9WgXcQ",
      title: "Classic Internet Hit (Remastered)",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      channelName: "RickAstleyVEVO",
      views: 1500000000,
      category: "Entertainment",
    },
    {
      videoId: "VYOjWnS4cMY",
      title: "Championship Highlights - Best Plays",
      thumbnailUrl: "https://img.youtube.com/vi/VYOjWnS4cMY/hqdefault.jpg",
      channelName: "SportsCenter",
      views: 3100000,
      category: "Sports",
    },
    {
      videoId: "3GwjfUFyY6M",
      title: "Top 10 Goals - Legendary Matches",
      thumbnailUrl: "https://img.youtube.com/vi/3GwjfUFyY6M/hqdefault.jpg",
      channelName: "FIFA",
      views: 2700000,
      category: "Sports",
    },
    {
      videoId: "kXYiU_JCYtU",
      title: "Training Routine: Build Stamina Fast",
      thumbnailUrl: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
      channelName: "AthletePro",
      views: 650000,
      category: "Sports",
    },
    {
      videoId: "mU6anWqZJcc",
      title: "Best Laptops for Students (2026 Guide)",
      thumbnailUrl: "https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg",
      channelName: "Linus Tech Tips",
      views: 1450000,
      category: "Computers",
    },
    {
      videoId: "w7ejDZ8SWv8",
      title: "Build a PC: Step-by-Step Guide",
      thumbnailUrl: "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
      channelName: "JayzTwoCents",
      views: 2050000,
      category: "Computers",
    },
    {
      videoId: "pKd0Rpw7O48",
      title: "Keyboard Shortcuts That Save Hours",
      thumbnailUrl: "https://img.youtube.com/vi/pKd0Rpw7O48/hqdefault.jpg",
      channelName: "Computerphile",
      views: 720000,
      category: "Computers",
    },
    {
      videoId: "Ke90Tje7VS0",
      title: "React Full Tutorial (Beginner Friendly)",
      thumbnailUrl: "https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg",
      channelName: "Programming with Mosh",
      views: 1520000,
      category: "IT & Software",
    },
    {
      videoId: "TlB_eWDSMt4",
      title: "Node.js Crash Course",
      thumbnailUrl: "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
      channelName: "Traversy Media",
      views: 980000,
      category: "IT & Software",
    },
    {
      videoId: "ofme2o29ngU",
      title: "MongoDB in 1 Hour",
      thumbnailUrl: "https://img.youtube.com/vi/ofme2o29ngU/hqdefault.jpg",
      channelName: "Academind",
      views: 760000,
      category: "IT & Software",
    },
    {
      videoId: "jS4aFq5-91M",
      title: "JWT Authentication Explained",
      thumbnailUrl: "https://img.youtube.com/vi/jS4aFq5-91M/hqdefault.jpg",
      channelName: "Web Dev Simplified",
      views: 470000,
      category: "IT & Software",
    },
    {
      videoId: "HGgyd1bYWsE",
      title: "REST APIs Explained (Simple)",
      thumbnailUrl: "https://img.youtube.com/vi/HGgyd1bYWsE/hqdefault.jpg",
      channelName: "Academind",
      views: 410000,
      category: "IT & Software",
    },
    {
      videoId: "9bZkp7q19f0",
      title: "Daily News Roundup - Headlines Today",
      thumbnailUrl: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
      channelName: "News Live",
      views: 1300000,
      category: "News",
    },
    {
      videoId: "hY7m5jjJ9mM",
      title: "Breaking Update: Major Tech Announcement",
      thumbnailUrl: "https://img.youtube.com/vi/hY7m5jjJ9mM/hqdefault.jpg",
      channelName: "Tech News",
      views: 880000,
      category: "News",
    },
    {
      videoId: "C0DPdy98e4c",
      title: "World Update: What Happened Today",
      thumbnailUrl: "https://img.youtube.com/vi/C0DPdy98e4c/hqdefault.jpg",
      channelName: "Global Report",
      views: 620000,
      category: "News",
    },
    {
      videoId: "RGOj5yH7evk",
      title: "Software Engineer Roadmap (Beginner to Job)",
      thumbnailUrl: "https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg",
      channelName: "freeCodeCamp",
      views: 1250000,
      category: "IT & Software",
    },
  ];

const Home = ({ searchTerm }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return sampleVideos
      .filter((v) => (activeCategory === "All" ? true : v.category === activeCategory))
      .filter((v) => (q ? v.title.toLowerCase().includes(q) : true));
  }, [searchTerm, activeCategory]);

  return (
    <>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="video-grid">
        {filteredVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </>
  );
};

export default Home;