import VideoCard from "../components/VideoCard";
import "../styles/video.css";

const sampleVideos = [
  {
    videoId: "Ke90Tje7VS0",
    title: "Learn React in 30 Minutes",
    thumbnailUrl: "https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    channelName: "Programming with Mosh",
    views: 1520000,
  },
  {
    videoId: "TlB_eWDSMt4",
    title: "Node.js Crash Course",
    thumbnailUrl: "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
    channelName: "Traversy Media",
    views: 980000,
  },
  {
    videoId: "ofme2o29ngU",
    title: "MongoDB in 1 Hour",
    thumbnailUrl: "https://img.youtube.com/vi/ofme2o29ngU/hqdefault.jpg",
    channelName: "Academind",
    views: 760000,
  },
  {
    videoId: "PkZNo7MFNFg",
    title: "JavaScript Full Course",
    thumbnailUrl: "https://img.youtube.com/vi/PkZNo7MFNFg/hqdefault.jpg",
    channelName: "freeCodeCamp",
    views: 4500000,
  },
  {
    videoId: "ZxKM3DCV2kE",
    title: "React Router Tutorial",
    thumbnailUrl: "https://img.youtube.com/vi/ZxKM3DCV2kE/hqdefault.jpg",
    channelName: "Web Dev Simplified",
    views: 620000,
  },
  {
    videoId: "bMknfKXIFA8",
    title: "React Hooks Explained",
    thumbnailUrl: "https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg",
    channelName: "Academind",
    views: 880000,
  },
  {
    videoId: "qz0aGYrrlhU",
    title: "HTML Crash Course",
    thumbnailUrl: "https://img.youtube.com/vi/qz0aGYrrlhU/hqdefault.jpg",
    channelName: "Traversy Media",
    views: 2100000,
  },
  {
    videoId: "1Rs2ND1ryYc",
    title: "CSS Flexbox Tutorial",
    thumbnailUrl: "https://img.youtube.com/vi/1Rs2ND1ryYc/hqdefault.jpg",
    channelName: "Web Dev Simplified",
    views: 1300000,
  },
  {
    videoId: "fBNz5xF-Kx4",
    title: "Express.js Crash Course",
    thumbnailUrl: "https://img.youtube.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
    channelName: "Traversy Media",
    views: 540000,
  },
  {
    videoId: "jS4aFq5-91M",
    title: "JWT Authentication Explained",
    thumbnailUrl: "https://img.youtube.com/vi/jS4aFq5-91M/hqdefault.jpg",
    channelName: "Web Dev Simplified",
    views: 470000,
  },
  {
    videoId: "ENrzD9HAZK4",
    title: "Redux Toolkit Tutorial",
    thumbnailUrl: "https://img.youtube.com/vi/ENrzD9HAZK4/hqdefault.jpg",
    channelName: "Codevolution",
    views: 390000,
  },
  {
    videoId: "Oe421EPjeBE",
    title: "Git & GitHub Crash Course",
    thumbnailUrl: "https://img.youtube.com/vi/Oe421EPjeBE/hqdefault.jpg",
    channelName: "Traversy Media",
    views: 1700000,
  },
  {
    videoId: "HGgyd1bYWsE",
    title: "REST API Explained",
    thumbnailUrl: "https://img.youtube.com/vi/HGgyd1bYWsE/hqdefault.jpg",
    channelName: "Academind",
    views: 410000,
  },
  {
    videoId: "7CqJlxBYj-M",
    title: "MongoDB Aggregation",
    thumbnailUrl: "https://img.youtube.com/vi/7CqJlxBYj-M/hqdefault.jpg",
    channelName: "MongoDB",
    views: 290000,
  },
  {
    videoId: "nu_pCVPKzTk",
    title: "Async JavaScript",
    thumbnailUrl: "https://img.youtube.com/vi/nu_pCVPKzTk/hqdefault.jpg",
    channelName: "freeCodeCamp",
    views: 960000,
  },
  {
    videoId: "kUMe1FH4CHE",
    title: "CSS Grid Tutorial",
    thumbnailUrl: "https://img.youtube.com/vi/kUMe1FH4CHE/hqdefault.jpg",
    channelName: "Traversy Media",
    views: 1850000,
  },
  {
    videoId: "dGcsHMXbSOA",
    title: "React Project Tutorial",
    thumbnailUrl: "https://img.youtube.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    channelName: "Programming with Mosh",
    views: 1100000,
  },
  {
    videoId: "rLTYHv5i2oY",
    title: "Node Authentication",
    thumbnailUrl: "https://img.youtube.com/vi/rLTYHv5i2oY/hqdefault.jpg",
    channelName: "Academind",
    views: 520000,
  },
  {
    videoId: "yfoY53QXEnI",
    title: "CSS Animations",
    thumbnailUrl: "https://img.youtube.com/vi/yfoY53QXEnI/hqdefault.jpg",
    channelName: "Dev Ed",
    views: 740000,
  },
  {
    videoId: "RGOj5yH7evk",
    title: "GitHub for Beginners",
    thumbnailUrl: "https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg",
    channelName: "freeCodeCamp",
    views: 1250000,
  },
];

const Home = () => {
  return (
    <div className="video-grid">
      {sampleVideos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default Home;
