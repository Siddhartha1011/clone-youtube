import { useMemo, useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../services/videoService";
import "../styles/video.css";

const categories = ["All", "Gaming", "Entertainment", "Sports", "Computers", "IT & Software", "News"];

const Home = ({ searchTerm }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getVideos({
      category: activeCategory === "All" ? undefined : activeCategory,
      search: searchTerm.trim() || undefined,
    })
      .then((data) => {
        if (!cancelled) setVideos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || "Failed to load videos.");
          setVideos([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [activeCategory, searchTerm]);

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

      {loading && <p className="loading-msg">Loading videos...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && !error && (
        <div className="video-grid">
          {videos.length === 0 ? (
            <p>No videos found. Run the backend and seed the database (npm run seed in backend).</p>
          ) : (
            videos.map((video) => (
              <VideoCard key={video.videoId || video._id} video={video} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Home;