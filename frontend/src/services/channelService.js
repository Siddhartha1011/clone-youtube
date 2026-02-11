import api from "./api";

export const getMyChannel = async () => {
  const { data } = await api.get("/channels/me");
  return data;
};

export const createChannel = async (payload) => {
  const { data } = await api.post("/channels", payload);
  return data;
};

export const getChannelById = async (id) => {
  const { data } = await api.get(`/channels/${id}`);
  return data;
};

export const getChannelVideos = async (channelId) => {
  const { data } = await api.get(`/channels/${channelId}/videos`);
  return data;
};
