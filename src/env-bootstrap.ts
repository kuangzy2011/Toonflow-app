import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "dev";

// 模拟Vite加载顺序，后面覆盖前面
const envFiles = [
  ".env",
  `.env.${NODE_ENV}.local`,
];

for (const filename of envFiles) {
  dotenv.config({
    path: path.resolve(process.cwd(), filename),
  });
}

// 校验
console.log("NODE_ENV:", NODE_ENV);
console.log("APP_TITLE:", process.env.APP_TITLE);
console.log("APP_PORT:", process.env.APP_PORT);
console.log("LOG_LEVEL:", process.env.LOG_LEVEL);
console.log("LOG_PREFIX:", process.env.LOG_PREFIX);
