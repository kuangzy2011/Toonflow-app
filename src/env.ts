import clogger from "@/utils/appLogger";
import { greeter } from "@/utils/greeter";

// 判断是否为打包后的 Electron 环境
const isElectron = typeof process.versions?.electron !== "undefined";
let isPackaged = false;
if (isElectron) {
  const { app } = require("electron");
  isPackaged = app.isPackaged;
}

//加载环境变量（打包环境默认使用 prod）
const env = process.env.NODE_ENV;
if (!env) {
  if (isElectron) process.env.NODE_ENV = "prod";
  else process.env.NODE_ENV = "dev";
  clogger.debug(`[环境变量：${process.env.NODE_ENV}, 日志模式： ${process.env.LOG_LEVEL}]`);
  //clogger.info("测试logger");
  //console.log(greeter.greet("My typescript project."));
}


