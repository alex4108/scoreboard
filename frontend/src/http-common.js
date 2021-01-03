import axios from "axios";

const apiEndpoint = process.env.apiEndpoint || window.location.hostname + ":8080";

export default axios.create({
  baseURL: "http://" + apiEndpoint + "/api",
  headers: {
    "Content-type": "application/json"
  }
});
