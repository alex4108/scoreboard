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

  addPlayer(sid, pid) { 
    var data = ""
    return http.post("/scoreboard/" + sid + "/players/" + pid + "/add", data)
  }

  remPlayer(sid, pid) { 
    var data = ""
    return http.post("/scoreboard/" + sid + "/players/" + pid + "/remove", data)
  }

  updateScore(sid, pid, score) { 
    var data = {
      score: score
    }
    return http.post("/scoreboard/" + sid + "/players/" + pid + "/score", data)
  }

  getScore(sid, pid) { 
    return http.get("/scoreboard/" + sid + "/players/" + pid + "/score")
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
