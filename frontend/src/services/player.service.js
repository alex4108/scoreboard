import http from "../http-common";

class PlayerDataService {
  getAll() {
    return http.get("/player");
  }

  get(id) {
    return http.get(`/player/${id}`);
  }

  create(data) {
    return http.post("/player", data);
  }

/*
  update(id, data) {
    return http.put(`/player/${id}`, data);
  }
  delete(id) {
    return http.delete(`/player/${id}`);
  }

  deleteAll() {
    return http.delete(`/player`);
  }

  findByTitle(title) {
    return http.get(`/player?title=${title}`);
  }
*/
}

export default new PlayerDataService();
