import { request as wxRequest } from "@tarojs/taro";
// import { SecretId, SecretKey } from "@/utils/config";
const BASEURL = `http://1.117.24.212:3000`;
// const BASEURL = `http://127.0.0.1:3000`;

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
  // if (!header["content-type"]) header["content-type"] = "application/json";
  return new Promise((resolve, reject) => {
    wxRequest({
      url: BASEURL + url,
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
  return request(url, "POST", data, config);
}

export function get(url, data?, config?) {
  return request(url, "GET", data, config);
}
