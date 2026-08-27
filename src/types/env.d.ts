declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_TITLE: string;
      APP_PORT: int;
      LOG_LEVEL: string;
      LOG_PREFIX: string;
      NODE_ENV?: "dev" | "prod";
      // 后续新增环境变量写在这里
    }
  }
}
export {}
