import http from "../http-common";

class ScoreboardDataService {
  getAll() {
    return http.get("/scoreboard");
  }

  get(id) {
    return http.get(`/scoreboard/${id}`);
  }

  create(data) {
    return http.post("/scoreboard", data);
  }


  start(id) {
    return http.get("/scoreboard/" + id + "/start");
  }

  end(id) { 
    return http.get("/scoreboard/" + id + "/end");
  }
/*
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

export default new ScoreboardDataService();
