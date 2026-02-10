import { useNavigate } from "react-router-dom";
import "../styles/video.css";

const VideoCard = ({ video, variant = "grid" }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`video-card ${variant === "compact" ? "compact" : ""}`}
      onClick={() => navigate(`/video/${video.videoId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/video/${video.videoId}`)}
    >
      <img src={video.thumbnailUrl} alt={video.title} className="video-thumb" />

      <div className="video-info">
        <h4 className="video-title">{video.title}</h4>
        <p className="video-channel">{video.channelName}</p>
        <p className="video-views">{video.views.toLocaleString()} views</p>
      </div>
    </div>
  );
};

export default VideoCard;