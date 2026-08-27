// 定义日志级别
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

// 定义 Logger 配置接口
export interface LoggerOptions {
  level: LogLevel;
  prefix?: string;
}

export function parseLogLevel(str: string | undefined, fallback: LogLevel = LogLevel.INFO): LogLevel {
  if (!str) return fallback;
  const key = str.trim().toUpperCase();
  if (key in LogLevel) {
    return LogLevel[key as keyof typeof LogLevel];
  }
  return fallback;
}

/**
 * 格式化日期 yyyy‑MM‑dd HH:mm:ss
 * @param date Date对象 / 时间戳
 */
export function dateFormat(date: Date | number): string {
  const d = typeof date === "number" ? new Date(date) : date;

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const h = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");

  return `${y}-${m}-${day} ${h}:${mi}:${s}`;
}

export class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor() {
    this.level = parseLogLevel(process.env.LOG_LEVEL);
    this.prefix = process.env.LOG_PREFIX ? `[${process.env.LOG_PREFIX}]` : '';
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = dateFormat(Date.now());
    return `${timestamp} ${this.prefix}${level} ${message}`;
  }

  public debug(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(`\x1b[36m%s\x1b[0m`, this.formatMessage('[DEBUG]', message), ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(`\x1b[32m%s\x1b[0m`, this.formatMessage('[INFO]', message), ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(`\x1b[33m%s\x1b[0m`, this.formatMessage('[WARN]', message), ...args);
    }
  }

  public error(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(`\x1b[31m%s\x1b[0m`, this.formatMessage('[ERROR]', message), ...args);
    }
  }
}



//console.log(">>>>>>>>>>>>>log level:", process.env.LOG_LEVEL);
//const logger = new CustomLogger((process.env.LOG_LEVEL as LogLevel) || 'info');
//const logger = new Logger('info');
const clogger = new Logger();

export default clogger;

