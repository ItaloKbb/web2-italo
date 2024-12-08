import express from "express";
import { getApiInfo, getServerUptime } from "../controllers/infoController.js";

const router = express.Router();

// Rota para obter informações da API
router.get("/version", getApiInfo);

// Rota para obter tempo de execução do servidor
router.get("/uptime", getServerUptime);

export default router;