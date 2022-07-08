import { navigateTo, navigateBack, redirectTo } from "@tarojs/taro";
import { routerMap } from "./index";

const isObject = (v) => typeof v === "object" && v !== null;

const injectParams = (options) => {
  options = options ? { ...options } : {};
  let params = options.params || options.query;
  let qstr = "";
  if (params) {
    Object.keys(params).forEach((key) => {
      qstr += `${key}=${encodeURIComponent(
        isObject(params[key]) ? JSON.stringify(params[key]) : params[key]
      )}&`;
    });
  }
  return qstr.slice(0, -1);
};

const router = {
  push(name: any, options?: any) {
    if (name && typeof name === "object") {
      options = name;
    }
    let url = routerMap[options.name];
    let querystr = injectParams(options);
    url = querystr ? `${url}?${querystr}` : url;
    let method = navigateTo;
    if (options.replace) {
      method = redirectTo;
    }
    console.log("push", name, url, options);
    if (url) {
      method({
        url,
        ...{ options, replace: void 0, name: void 0 },
      });
    }
  },
  go(delta) {
    navigateBack({
      delta: -delta,
    });
  },
};

export default router;
