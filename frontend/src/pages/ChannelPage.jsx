import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyChannel,
  createChannel,
  getChannelById,
  getChannelVideos,
} from "../services/channelService";
import {
  createVideo,
  updateVideo,
  deleteVideo,
} from "../services/videoService";
import { useAuth } from "../context/AuthContext";
import "../styles/channel.css";

const categories = ["Gaming", "Entertainment", "Sports", "Computers", "IT & Software", "News"];

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Videos");
  const isMyChannel = id === "me";

  const [createForm, setCreateForm] = useState({
    channelName: "",
    description: "",
  });
  const [videoForm, setVideoForm] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    description: "",
    category: categories[0],
  });
  const [editingVideo, setEditingVideo] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);

  const subscribeStorageKey = channel?._id ? `subscribed_${channel._id}` : null;
  const [subscribed, setSubscribed] = useState(() =>
    subscribeStorageKey ? localStorage.getItem(subscribeStorageKey) === "true" : false
  );

  useEffect(() => {
    if (subscribeStorageKey) {
      setSubscribed(localStorage.getItem(subscribeStorageKey) === "true");
    }
  }, [channel?._id]);

  const handleToggleSubscribe = () => {
    const next = !subscribed;
    setSubscribed(next);
    if (subscribeStorageKey) localStorage.setItem(subscribeStorageKey, String(next));
  };

  useEffect(() => {
    if (isMyChannel && !user) {
      navigate("/login");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");
    const fetchChannel = isMyChannel ? getMyChannel() : getChannelById(id);
    fetchChannel
      .then((ch) => {
        if (!cancelled) setChannel(ch);
      })
      .catch((err) => {
        if (!cancelled) {
          if (isMyChannel && err.response?.status === 404) setChannel(null);
          else setError(err.response?.data?.message || "Channel not found.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id, isMyChannel, user, navigate]);

  useEffect(() => {
    if (!channel?._id) return;
    getChannelVideos(channel._id)
      .then((list) => setVideos(Array.isArray(list) ? list : []))
      .catch(() => setVideos([]));
  }, [channel?._id]);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!createForm.channelName.trim()) return;
    setError("");
    try {
      const ch = await createChannel(createForm);
      setChannel(ch);
      setCreateForm({ channelName: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel.");
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoForm.title.trim() || !videoForm.thumbnailUrl.trim() || !videoForm.videoUrl.trim()) return;
    setError("");
    try {
      await createVideo(videoForm);
      const list = await getChannelVideos(channel._id);
      setVideos(Array.isArray(list) ? list : []);
      setVideoForm({ title: "", thumbnailUrl: "", videoUrl: "", description: "", category: categories[0] });
      setShowVideoForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add video.");
    }
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    if (!editingVideo || !videoForm.title.trim()) return;
    setError("");
    try {
      await updateVideo(editingVideo.videoId || editingVideo._id, videoForm);
      const list = await getChannelVideos(channel._id);
      setVideos(Array.isArray(list) ? list : []);
      setEditingVideo(null);
      setVideoForm({ title: "", thumbnailUrl: "", videoUrl: "", description: "", category: categories[0] });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update video.");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await deleteVideo(videoId);
      setVideos((prev) => prev.filter((v) => (v.videoId || v._id) !== videoId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete video.");
    }
  };

  const startEditVideo = (v) => {
    setEditingVideo(v);
    setVideoForm({
      title: v.title || "",
      thumbnailUrl: v.thumbnailUrl || "",
      videoUrl: v.videoUrl || "",
      description: v.description || "",
      category: v.category || categories[0],
    });
  };

  if (isMyChannel && !user) return null;
  if (loading) return <p>Loading channel...</p>;

  if (isMyChannel && !channel && !error) {
    return (
      <div className="channel-page">
        <h2>Create your channel</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleCreateChannel} className="channel-form">
          <input
            placeholder="Channel name"
            value={createForm.channelName}
            onChange={(e) => setCreateForm((f) => ({ ...f, channelName: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={createForm.description}
            onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
          />
          <button type="submit">Create channel</button>
        </form>
      </div>
    );
  }

  if (error && !channel) return <p className="error-msg">{error}</p>;
  if (!channel) return <p>Channel not found.</p>;

  const channelName = channel.channelName || channel.name || "Channel";
  const isOwner = user && channel.owner && (channel.owner._id || channel.owner) === user._id;

  return (
    <div className="channel-page">
      <div className="channel-banner" />

      <div className="channel-header">
        <div className="channel-avatar">
          <span>{channelName[0]?.toUpperCase()}</span>
        </div>
        <div className="channel-meta">
          <h2 className="channel-title">{channelName}</h2>
          <p className="channel-subtext">
            {(channel.subscribers || 0).toLocaleString()} subscribers • {videos.length} videos
          </p>
        </div>
        {!isOwner && (
          <button
            type="button"
            className={`subscribe-btn ${subscribed ? "subbed" : ""}`}
            onClick={handleToggleSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      {error && <p className="error-msg">{error}</p>}

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

      {activeTab === "Videos" && (
        <div className="channel-videos">
          {isOwner && (
            <>
              {!showVideoForm && !editingVideo && (
                <button className="add-video-btn" onClick={() => setShowVideoForm(true)}>
                  Add video
                </button>
              )}
              {(showVideoForm || editingVideo) && (
                <form
                  className="video-edit-form"
                  onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo}
                >
                  <input
                    placeholder="Title"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm((f) => ({ ...f, title: e.target.value }))}
                    required
                  />
                  <input
                    placeholder="Thumbnail URL"
                    value={videoForm.thumbnailUrl}
                    onChange={(e) => setVideoForm((f) => ({ ...f, thumbnailUrl: e.target.value }))}
                    required
                  />
                  <input
                    placeholder="Video URL"
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm((f) => ({ ...f, videoUrl: e.target.value }))}
                    required
                  />
                  <input
                    placeholder="Description (optional)"
                    value={videoForm.description}
                    onChange={(e) => setVideoForm((f) => ({ ...f, description: e.target.value }))}
                  />
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="form-actions">
                    <button type="submit">{editingVideo ? "Update" : "Add"} video</button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowVideoForm(false);
                        setEditingVideo(null);
                        setVideoForm({ title: "", thumbnailUrl: "", videoUrl: "", description: "", category: categories[0] });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {videos.length === 0 ? (
            <p>No videos yet.</p>
          ) : (
            videos.map((v) => {
              const vid = v.videoId || v._id;
              return (
                <div key={vid} className="channel-video-row">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/video/${vid}`)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/video/${vid}`)}
                    className="row-clickable"
                  >
                    <img className="row-thumb" src={v.thumbnailUrl} alt={v.title} />
                    <div className="row-info">
                      <h4 className="row-title">{v.title}</h4>
                      <p className="row-desc">{v.description}</p>
                      <p className="row-meta">
                        {(v.views || 0).toLocaleString()} views • {v.category}
                      </p>
                    </div>
                  </div>
                  {isOwner && (
                    <div className="row-actions">
                      <button onClick={() => startEditVideo(v)}>Edit</button>
                      <button className="danger" onClick={() => handleDeleteVideo(vid)}>Delete</button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "About" && (
        <div className="channel-about">
          <h3>About</h3>
          <p>{channel.description || `Welcome to ${channelName}.`}</p>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
