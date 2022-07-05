import { akt } from "./http";
// 中国股票指数数据 https://akshare.akfamily.xyz/data/index/index.html#id2
export const getStockIndex = (...args: any[]) =>
  akt.get("/api/public/stock_zh_index_spot", ...args);
// 中证指数成份股权重 https://akshare.akfamily.xyz/data/index/index.html#id11
export const getStockWeight = (code = "", ...args: any[]) =>
  akt.get(
    `/api/public/index_stock_cons_weight_csindex?symbol=${code}`,
    ...args
  );
