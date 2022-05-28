import { request as wxRequest } from "@tarojs/taro";
// import { SecretId, SecretKey } from "@/utils/config";
const BASEURL = `https://iai.tencentcloudapi.com`;

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
        resolve(res?.data);
        console.log("request success:", res.data);
      },
      fail: (err) => {
        reject(err);
        console.log("request failed:", err);
      },
    });
  });
}

function genHeader() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "X-TC-Action": "DescribeInstances",
    "X-TC-Timestamp": Date.now(),
    "X-TC-Version": "2017-03-12",
    "X-TC-Region": "ap-guangzhou",
  };
}

export function post(url, data?, config?) {
  return request(url, "POST", data, config);
}

export function get(url, data?, config?) {
  return request(url, "GET", data, config);
}
