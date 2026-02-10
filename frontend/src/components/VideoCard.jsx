import "../styles/video.css";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="video-thumb"
      />

      <div className="video-info">
        <h4 className="video-title">{video.title}</h4>
        <p className="video-channel">{video.channelName}</p>
        <p className="video-views">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;