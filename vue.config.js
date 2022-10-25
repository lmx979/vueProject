const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 取消eslint检查
  lintOnSave: false,
});
