import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import infoRoutes from "./routes/infoRoutes.js"; // Importando infoRoutes
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger-output.json" assert { type: "json" };


import { logger } from "./middlewares/loggerMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const version = process.env.VERSION;
const app = express();
app.use(express.json());
app.use(logger); // Middleware para gerar logs.

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", infoRoutes); // Rota de informações
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});