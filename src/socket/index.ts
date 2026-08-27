import { Server } from "socket.io";
import productionAgent from "./routes/productionAgent";
import scriptAgent from "./routes/scriptAgent";
import clogger from "@/utils/appLogger";

export default (io: Server) => {
  const routes: Record<string, (nsp: ReturnType<Server["of"]>) => void> = {
    productionAgent,
    scriptAgent,
  };

  for (const [name, handler] of Object.entries(routes)) {
    const nsp = io.of(`/api/socket/${name}`);
    handler(nsp);
    clogger.info(`[Socket] 注册命名空间: /api/socket/${name}`);
  }
};
