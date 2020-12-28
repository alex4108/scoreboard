import axios from "axios";

const apiEndpoint = process.env.apiEndpoint || "localhost:8080";

export default axios.create({
  baseURL: "http://" + apiEndpoint + "/api",
  headers: {
    "Content-type": "application/json"
  }
});
