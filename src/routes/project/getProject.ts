import express from "express";
import u from "@/utils";
import { success } from "@/lib/responseFormat";
const router = express.Router();
import clogger from "@/utils/appLogger";

// 获取项目
export default router.post("/", async (req, res) => {
  const data = await u.db("o_project").select("*");
  clogger.debug("/routes/project/getProject: data:\n", data);
  res.status(200).send(success(data));
});
