import { routes } from "./router/index";
const pages = routes.map((route) => route.path);
export default defineAppConfig({
  pages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
