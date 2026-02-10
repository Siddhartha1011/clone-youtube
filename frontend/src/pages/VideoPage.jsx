import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sampleVideos } from "../data/mockVideos";
import { BiLike, BiDislike } from "react-icons/bi";
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
    <div className="video-page">
      <div className="player-wrap">
        <iframe
          className="player"
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
  );
};

export default VideoPage;