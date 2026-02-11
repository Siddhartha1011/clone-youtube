import api from "./api";

export const getVideos = async (params = {}) => {
  const { data } = await api.get("/videos", { params });
  return data;
};

export const getVideoById = async (id) => {
  const { data } = await api.get(`/videos/${id}`);
  return data;
};

export const createVideo = async (payload) => {
  const { data } = await api.post("/videos", payload);
  return data;
};

export const updateVideo = async (id, payload) => {
  const { data } = await api.put(`/videos/${id}`, payload);
  return data;
};

export const deleteVideo = async (id) => {
  await api.delete(`/videos/${id}`);
};

export const likeVideo = async (id) => {
  const { data } = await api.post(`/videos/${id}/like`);
  return data;
};

export const dislikeVideo = async (id) => {
  const { data } = await api.post(`/videos/${id}/dislike`);
  return data;
};
