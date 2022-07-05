import { request as wxRequest } from "@tarojs/taro";
// import { SecretId, SecretKey } from "@/utils/config";
// const BASEURL = `http://1.117.24.212:3000`;
console.log("ENV CONFIG:", process.env.CONFIG);
const BASEURL: String = process.env.CONFIG.BASEURL;
const AKTURL: String = `http://127.0.0.1:8001`;

/** HTTP 请求方法 */
interface Method {
  OPTIONS;
  GET;
  HEAD;
  POST;
  PUT;
  DELETE;
  TRACE;
  CONNECT;
}

export function request(url, method: keyof Method = "GET", data?, config?) {
  if (!config) config = {};
  let header = config.header || {};
  let host = config.BASEURL || "";
  // if (!header["content-type"]) header["content-type"] = "application/json";
  return new Promise((resolve, reject) => {
    wxRequest({
      url: host + url,
      method, // GET
      data, //	string/object/ArrayBuffer
      timeout: 60000,
      header,
      success: (res) => {
        console.log("request success:", res);
        if (res.statusCode == 200) {
          resolve(res?.data);
        } else {
          reject(res?.data);
        }
      },
      fail: (err) => {
        reject(err);
        console.log("request failed:", err);
      },
    });
  });
}

export function post(url, data?, config?) {
  return request(BASEURL + url, "POST", data, config);
}

export function get(url, data?, config?) {
  return request(BASEURL + url, "GET", data, config);
}

export const akt = {
  post: (url, data?, config?) => request(AKTURL + url, "POST", data, config),
  get: (url, data?, config?) => request(AKTURL + url, "GET", data, config),
};
