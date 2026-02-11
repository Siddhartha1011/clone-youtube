import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import VideoCard from "../components/VideoCard";
import { getVideoById, getVideos, likeVideo as apiLike, dislikeVideo as apiDislike } from "../services/videoService";
import { getComments, addComment, updateComment, deleteComment } from "../services/commentService";
import { useAuth } from "../context/AuthContext";
import "../styles/videoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [commentError, setCommentError] = useState("");
  const [likeError, setLikeError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getVideoById(id)
      .then((v) => {
        if (!cancelled) {
          setVideo(v);
          setLikes(v.likes ?? 0);
          setDislikes(v.dislikes ?? 0);
          setUserLiked(!!v.userLiked);
          setUserDisliked(!!v.userDisliked);
        }
      })
      .catch(() => {
        if (!cancelled) setVideo(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!video) return;
    getVideos({ category: video.category })
      .then((list) => {
        const related = (list || [])
          .filter((v) => (v.videoId || v._id) !== id)
          .slice(0, 8);
        setRelatedVideos(related);
      })
      .catch(() => setRelatedVideos([]));
  }, [video, id]);

  useEffect(() => {
    getComments(id)
      .then((list) => setComments(Array.isArray(list) ? list : []))
      .catch(() => setComments([]));
  }, [id]);

  const handleLike = async () => {
    setLikeError("");
    if (!user) {
      setLikeError("Sign in to like or dislike.");
      return;
    }
    try {
      const res = await apiLike(id);
      setLikes(res.likes);
      setDislikes(res.dislikes);
      setUserLiked(!!res.userLiked);
      setUserDisliked(!!res.userDisliked);
    } catch (err) {
      setLikeError(err.response?.data?.message || "Could not update like.");
    }
  };

  const handleDislike = async () => {
    setLikeError("");
    if (!user) {
      setLikeError("Sign in to like or dislike.");
      return;
    }
    try {
      const res = await apiDislike(id);
      setLikes(res.likes);
      setDislikes(res.dislikes);
      setUserLiked(!!res.userLiked);
      setUserDisliked(!!res.userDisliked);
    } catch (err) {
      setLikeError(err.response?.data?.message || "Could not update dislike.");
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setCommentError("");
    if (editingId) {
      try {
        const updated = await updateComment(editingId, value);
        setComments((prev) =>
          prev.map((c) => (c.commentId === editingId ? { ...c, ...updated } : c))
        );
        setEditingId(null);
        setText("");
      } catch (err) {
        setCommentError(err.response?.data?.message || "Failed to update comment.");
      }
      return;
    }
    if (!user) {
      setCommentError("Sign in to comment.");
      return;
    }
    try {
      const newComment = await addComment(id, value);
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch (err) {
      setCommentError(err.response?.data?.message || "Failed to post comment.");
    }
  };

  const startEdit = (comment) => {
    if (user && (comment.userId === user._id || comment.user === user.username)) {
      setEditingId(comment.commentId);
      setText(comment.text);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
      if (editingId === commentId) {
        setEditingId(null);
        setText("");
      }
    } catch {}
  };

  const goToChannel = () => {
    if (video?.channelId) navigate(`/channel/${video.channelId}`);
    else if (video?.channelName) navigate(`/channel/${encodeURIComponent(video.channelName)}`);
  };

  if (loading) return <p>Loading video...</p>;
  if (!video) return <h2>Video not found</h2>;

  return (
    <div className="video-page-grid">
      {/* LEFT: Main video section */}
      <div className="video-main">
        <div className="player-wrap">
          <video className="player" controls src={video.videoUrl} />
        </div>

        <h2 className="vp-title">{video.title}</h2>

        {/* ✅ Clickable channel name */}
        <button className="channel-link" onClick={goToChannel}>
          {video.channelName}
        </button>

        <p className="vp-desc">{video.description}</p>

        <div className="vp-actions">
          {likeError && <p className="comment-error">{likeError}</p>}
          <button
            type="button"
            className={`action-btn ${userLiked ? "active" : ""}`}
            onClick={handleLike}
            title={!user ? "Sign in to like" : ""}
          >
            <BiLike size={20} /> Like {likes > 0 && `· ${likes}`}
          </button>
          <button
            type="button"
            className={`action-btn ${userDisliked ? "active" : ""}`}
            onClick={handleDislike}
            title={!user ? "Sign in to dislike" : ""}
          >
            <BiDislike size={20} /> Dislike {dislikes > 0 && `· ${dislikes}`}
          </button>
        </div>

        <div className="comments">
          <h3>Comments</h3>
          {commentError && <p className="comment-error">{commentError}</p>}
          {user && (
            <form className="comment-form" onSubmit={handleAddOrUpdate}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">{editingId ? "Update" : "Post"}</button>
              {editingId && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => { setEditingId(null); setText(""); }}
                >
                  Cancel
                </button>
              )}
            </form>
          )}
          {!user && <p className="comment-hint">Sign in to add a comment.</p>}

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.commentId} className="comment">
                <div className="comment-head">
                  <strong>{c.user}</strong>
                  <span>{c.timestamp ? new Date(c.timestamp).toLocaleString() : ""}</span>
                </div>
                <p>{c.text}</p>
                {user && (c.userId === user._id || c.user === user.username) && (
                  <div className="comment-actions">
                    <button onClick={() => startEdit(c)}>Edit</button>
                    <button onClick={() => removeComment(c.commentId)} className="danger">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Related videos */}
      <aside className="related">
        <h3 className="related-title">Related</h3>

        {relatedVideos.length === 0 ? (
          <p className="related-empty">No related videos found.</p>
        ) : (
          relatedVideos.map((rv) => (
            <VideoCard key={rv.videoId} video={rv} variant="compact" />
          ))
        )}
      </aside>
    </div>
  );
};

export default VideoPage;