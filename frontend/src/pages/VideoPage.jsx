import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sampleVideos } from "../data/mockVideos";
import { BiLike, BiDislike } from "react-icons/bi";
import VideoCard from "../components/VideoCard";
import "../styles/videoPage.css";

const storageKey = (id) => `video_comments_${id}`;

const VideoPage = () => {
  const { id } = useParams();

  const video = useMemo(() => sampleVideos.find((v) => v.videoId === id), [id]);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey(id));
    setComments(saved ? JSON.parse(saved) : []);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(storageKey(id), JSON.stringify(comments));
  }, [comments, id]);

  if (!video) return <h2>Video not found</h2>;

  //  Related videos: same category, exclude current, limit 8
  const relatedVideos = useMemo(() => {
    return sampleVideos
      .filter((v) => v.videoId !== id)
      .filter((v) => v.category === video.category)
      .slice(0, 8);
  }, [id, video.category]);

  const handleLike = () => {
    setLiked((v) => !v);
    if (!liked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked((v) => !v);
    if (!disliked) setLiked(false);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    if (editingId) {
      setComments((prev) =>
        prev.map((c) => (c.commentId === editingId ? { ...c, text: value } : c))
      );
      setEditingId(null);
      setText("");
      return;
    }

    const newComment = {
      commentId: crypto.randomUUID(),
      user: "You",
      text: value,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  const startEdit = (comment) => {
    setEditingId(comment.commentId);
    setText(comment.text);
  };

  const removeComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    if (editingId === commentId) {
      setEditingId(null);
      setText("");
    }
  };

  return (
    <div className="video-page-grid">
      {/* LEFT: Main video section */}
      <div className="video-main">
        <div className="player-wrap">
          {/*  Use <video> if your videoUrl is MP4 */}
          <video className="player" controls src={video.videoUrl} />

          {/* If you still use iframe embeds, use this instead:
          <iframe
            className="player"
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          */}
        </div>

        <h2 className="vp-title">{video.title}</h2>
        <p className="vp-channel">{video.channelName}</p>
        <p className="vp-desc">{video.description}</p>

        <div className="vp-actions">
          <button className={`action-btn ${liked ? "active" : ""}`} onClick={handleLike}>
            <BiLike size={20} /> Like
          </button>

          <button className={`action-btn ${disliked ? "active" : ""}`} onClick={handleDislike}>
            <BiDislike size={20} /> Dislike
          </button>
        </div>

        <div className="comments">
          <h3>Comments</h3>

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
                onClick={() => {
                  setEditingId(null);
                  setText("");
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.commentId} className="comment">
                <div className="comment-head">
                  <strong>{c.user}</strong>
                  <span>{new Date(c.timestamp).toLocaleString()}</span>
                </div>
                <p>{c.text}</p>
                <div className="comment-actions">
                  <button onClick={() => startEdit(c)}>Edit</button>
                  <button onClick={() => removeComment(c.commentId)} className="danger">
                    Delete
                  </button>
                </div>
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