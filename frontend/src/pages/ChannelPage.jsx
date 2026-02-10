import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleVideos } from "../data/mockVideos";
import { channelMeta } from "../data/channelMeta";
import "../styles/channel.css";
import useCountUp from "../hooks/useCountUp";

const ChannelPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const channelVideos = useMemo(
    () => sampleVideos.filter((v) => v.channelName.toLowerCase() === name.toLowerCase()),
    [name]
  );

  const channelName = channelVideos[0]?.channelName || name;

  // get channel metadata by name
  const meta = channelMeta[channelName] || {};

  // localStorage subscribe state per channel
  const storageKey = `subscribed_${channelName.toLowerCase()}`;
  const [subscribed, setSubscribed] = useState(
    () => localStorage.getItem(storageKey) === "true"
  );

  // animated subscribers
  const baseSubscribers = meta.subscribers || 0;
  const subscriberTarget = baseSubscribers + (subscribed ? 1 : 0);
  const animatedSubscribers = useCountUp(subscriberTarget, 650);

  const [activeTab, setActiveTab] = useState("Videos");

  const toggleSubscribe = () => {
    const next = !subscribed;
    setSubscribed(next);
    localStorage.setItem(storageKey, String(next));
  };

  return (
    <div className="channel-page">
      {/*  Banner from channelMeta */}
      <div
        className="channel-banner"
        style={
          meta.banner
            ? {
                backgroundImage: `url(${meta.banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />

      <div className="channel-header">
        {/*  Avatar from channelMeta with fallback */}
        <div className="channel-avatar">
          {meta.avatar ? (
            <img
              src={meta.avatar}
              alt={channelName}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span>{channelName?.[0]?.toUpperCase()}</span>
          )}
        </div>

        <div className="channel-meta">
          <h2 className="channel-title">{channelName}</h2>
          <p className="channel-subtext">
            {animatedSubscribers.toLocaleString()} subscribers • {channelVideos.length} videos
          </p>
        </div>

        <button
          className={`subscribe-btn ${subscribed ? "subbed" : ""}`}
          onClick={toggleSubscribe}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="channel-tabs">
        {["Videos", "About"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Videos" ? (
        <div className="channel-videos">
          {channelVideos.length === 0 ? (
            <p>No videos found for this channel.</p>
          ) : (
            channelVideos.map((v) => (
              <div
                key={v.videoId}
                className="channel-video-row"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/video/${v.videoId}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/video/${v.videoId}`)}
              >
                <img className="row-thumb" src={v.thumbnailUrl} alt={v.title} />
                <div className="row-info">
                  <h4 className="row-title">{v.title}</h4>
                  <p className="row-desc">{v.description}</p>
                  <p className="row-meta">
                    {v.views.toLocaleString()} views • {v.category}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="channel-about">
          <h3>About</h3>
          <p>
            Welcome to <strong>{channelName}</strong>. This is a mock channel page for your MERN
            YouTube Clone. Later, you’ll load channel details and videos from MongoDB.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;