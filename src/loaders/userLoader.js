import instance from "../services/instance";

const userLoader = async () => {
  try {
    const response = await instance.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};

export default userLoader;
