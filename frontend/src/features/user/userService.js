import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

const axiosConfig = {
  withCredentials: true,
};

// const register = async (userData) => {
//   const payload = {
//     full_name: userData.name,
//     email: userData.email,
//     password: userData.password, // backend hashleyecek
//   };

//   console.log("📤 Register payload:", payload); // debug
//   const response = await axios.post(
//     `${API_URL}/register`,
//     payload,
//     axiosConfig
//   );
//   return response.data;
// };

const register = async (userData) => {
  // artık userData direkt backend alanlarıyla uyumlu
  const response = await axios.post(
    `${API_URL}/register`,
    userData,
    axiosConfig
  );
  return response.data;
};
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData, axiosConfig);
  return res.data;
};

const getProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`, axiosConfig);
  return res.data;
};

const updateProfile = async (userData) => {
  const res = await axios.put(`${API_URL}/profile`, userData, axiosConfig);
  return res.data;
};

const changePassword = async (passwordData) => {
  const res = await axios.put(
    `${API_URL}/profile/password`,
    passwordData,
    axiosConfig
  );
  return res.data;
};
const logout = async () => {
  const res = await axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

const userService = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
};
export default userService;
