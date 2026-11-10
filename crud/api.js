import Axios from "react-native-axios";

const api = Axios.create({
  baseURL: "https://harmonize-proclai[m-little.ngrok-free.dev",
});

export default api;