import { http } from "../http";

export default {
  search (params) {
    return http.get("/api/posts", { params: params });
  },
  create (params) {
    return http.post("/api/posts/create", params);
  },
  detail (id) {
    return http.get("/api/posts/" + id);
  },
  update (params) {
    return http.post("/api/posts/" + params.id, params);
  },
  delete (id) {
    return http.post("/api/posts/delete/" + id);
  },
}