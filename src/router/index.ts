const routes = [
  {
    name: "index",
    path: "pages/index/index",
  },
  {
    name: "stock-detail",
    path: "pages/stock-detail/index",
  },
];

const routerMap = {};

routes.forEach((route) => {
  routerMap[route.name] = route.path;
});

export { routes, routerMap };
