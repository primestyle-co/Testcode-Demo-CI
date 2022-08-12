import { http } from "../http";

export default {
  login (params) {
    return http.post("/auth/login", params);
  },

  register (params) {
    return http.post("/auth/register", params);
  },

  logout () {
    return http.post("/auth/logout");
  }
}