import { Request, Response, NextFunction } from "express";
import { z, ZodTypeAny } from "zod";
import clogger from "@/utils/appLogger";
import u from "@/utils";

import { zhCN } from "zod/locales";

z.config(zhCN());

export function validateFields(
  shape: Record<string, ZodTypeAny>,
  source: "body" | "query" | "params" = "body", // 默认校验 body
) {
  const schema = z.object(shape);

  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((issue) => `字段 ${issue.path.join(".")} ${issue.message}`);
      console.error(errors);
      return res.status(400).json({ message: "参数错误", errors });
    }
    next();
  };
}


// 定义统一的响应数据结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 全局 Response Hook 中间件
 * 拦截 res.json，自动包装返回数据
 */
export function responseHook(req: Request, res: Response, next: NextFunction) {
  // 保存原始的 res.json 方法
  const originalJson = res.json.bind(res);

  // 重写 res.json
  res.json = function <T>(body: T | ApiResponse<T>): Response<any, Record<string, any>> {

    //clogger.debug("[HOOK response] body:", body);
    
    // 1. 判断是否已经是标准格式，防止重复包装（例如错误处理中间件已经包装过）
    if (
      body && 
      typeof body === 'object' && 
      'code' in body && 
      'message' in body && 
      'data' in body
    ) {
      return originalJson(body as ApiResponse<T>);
    }

    // 2. 自动包装为标准格式
    const wrappedResponse: ApiResponse<T> = {
      code: 200, // 默认业务状态码
      message: 'success',
      data: body as T,
    };

    // 3. 调用原始方法发送数据
    return originalJson(wrappedResponse);
  };

  next();
}
