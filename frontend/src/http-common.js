import axios from "axios";

const proto = ((window.location.href.match('http:')) ? "http" : "https")
const apiEndpoint = process.env.apiEndpoint || proto + "://" + window.location.hostname + ":8080";

export default axios.create({
  baseURL: apiEndpoint + "/api",
  headers: {
    "Content-type": "application/json"
  }
});
