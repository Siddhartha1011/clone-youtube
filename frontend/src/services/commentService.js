import api from "./api";

export const getComments = async (videoId) => {
  const { data } = await api.get(`/comments/${videoId}`);
  return data;
};

export const addComment = async (videoId, text) => {
  const { data } = await api.post(`/comments/${videoId}`, { text });
  return data;
};

export const updateComment = async (commentId, text) => {
  const { data } = await api.put(`/comments/${commentId}`, { text });
  return data;
};

export const deleteComment = async (commentId) => {
  await api.delete(`/comments/${commentId}`);
};
