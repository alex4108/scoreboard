import axios from "axios";

const proto = ((window.location.href.match('http:')) ? "http" : "https")
const apiEndpoint = ((process.env.apiEndpoint) ? process.env.apiEndpoint : ((process.env.NODE_ENV == "development") ?  proto + "://" + window.location.hostname + ":8080" : proto + "://" + window.location.hostname + ""));
// First try apiEndpoint environment variable
// Then use :8080 if dev is set
// Otherwise, default port

export default axios.create({
  baseURL: apiEndpoint + "/api",
  headers: {
    "Content-type": "application/json"
  }
});
