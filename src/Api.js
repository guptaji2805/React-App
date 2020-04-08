import { create } from "apisauce";
import { encode as btoa } from "base-64";
var Environment = require("../env.js");
var config = require("../assets/config/config.json");

const clientID = Environment.API_KEY;
const clientSecret = Environment.API_SECRET;

const signature = clientID + ":" + clientSecret;
const base64Signature = btoa(signature);

const Authorization = "Basic " + base64Signature;
const URL = Environment.BASE_URL;

const api = create({
  baseURL: URL,
  Accept: "application/json",
  headers: {
    Authorization: Authorization,
    "content-type": "application/json",
    TenantId: config.name
  }
});

api.addRequestTransform(request => {  
  if (
    request.url.indexOf("oauth") == -1 &&
    request.headers["Authorization"] == undefined
  ) {
    request.headers["Authorization"] = Authorization;
  }
  if (request.url.indexOf("oauth") == -1) {
    request.headers["TenantId"] = config.name;
  }
  request.headers["Accept-Language"] = "en-GB";
});
export default api;
