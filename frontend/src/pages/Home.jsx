import { useMemo, useState } from "react";
import VideoCard from "../components/VideoCard";
import "../styles/video.css";
import { sampleVideos } from "../data/mockVideos";

const categories = ["All", "Gaming", "Entertainment", "Sports", "Computers", "IT & Software", "News"];

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