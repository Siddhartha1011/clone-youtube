import { useNavigate } from "react-router-dom";
import "../styles/video.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div className="video-card" onClick={() => navigate(`/video/${video.videoId}`)}>
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