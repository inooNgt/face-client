import { post } from "./http";

export const detectFace = (...args: any[]) => post("/iai/detect", ...args);
