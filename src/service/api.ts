import { post } from "./http";

// 接口数据结构 https://cloud.tencent.com/document/api/867/45020#Eye
export const detectFace = (...args: any[]) => post("/iai/detect", ...args);
