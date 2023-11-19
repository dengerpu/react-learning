const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
      createProxyMiddleware("/api", {
          target: "http://127.0.0.1:7100",
          changeOrigin: true,
          ws: true,
          pathRewrite: { "^/api": "" }
      })
  );
  // 下面两个配置测试使用
  app.use(
    createProxyMiddleware("/jianshu", {
        target: "https://www.jianshu.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/jianshu": "" }
    })
  );
  app.use(
    createProxyMiddleware("/zhihu", {
        target: "https://news-at.zhihu.com/api/4",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/zhihu": "" }
    })
  );
};