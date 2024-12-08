import express from "express";
import * as postController from "../controllers/postController.js";
import Joi from "joi";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validationMiddleware.js";

export const postSchema = Joi.object({
  title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
          'string.base': 'O campo title deve ser um texto.',
          'string.min': 'O campo title deve ter no mínimo {#limit} caracteres.',
          'string.max': 'O campo title deve ter no máximo {#limit} caracteres.',
          'any.required': 'O campo title é obrigatório.',
      }),
  content: Joi.string()
      .min(10)
      .required()
      .messages({
          'string.base': 'O campo content deve ser um texto.',
          'string.min': 'O campo content deve ter no mínimo {#limit} caracteres.',
          'any.required': 'O campo content é obrigatório.',
      }),
});

const router = express.Router();

// Rotas de Posts
router.post("/posts", authenticate, validateBody(postSchema), postController.createPost); // Validação aplicada
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPostsById);
router.get("/users/:userId/posts", postController.getPostsByUserId);
router.put("/posts/:id", authenticate, validateBody(postSchema), postController.updatePost); // Validação aplicada
router.delete("/posts/:id", authenticate, postController.deletePost); // Apenas autenticação

export default router;
