import { get } from "./http";

export const detectFace = (...args: any[]) => get("/", ...args);
