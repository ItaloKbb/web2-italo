import express from "express";
import * as userController from "../controllers/userController.js";
import Joi from "joi";
import { validateBody } from "../middlewares/validationMiddleware.js";
import { authenticate } from "../middlewares/authMiddleware.js";

export const userSchema = Joi.object({
  username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
          'string.base': 'O campo username deve ser um texto.',
          'string.min': 'O campo username deve ter no mínimo {#limit} caracteres.',
          'string.max': 'O campo username deve ter no máximo {#limit} caracteres.',
          'any.required': 'O campo username é obrigatório.',
      }),
  email: Joi.string()
      .email()
      .required()
      .messages({
          'string.email': 'O campo email deve ser um endereço de e-mail válido.',
          'any.required': 'O campo email é obrigatório.',
      }),
  password: Joi.string()
      .min(8)
      .required()
      .messages({
          'string.base': 'O campo password deve ser um texto.',
          'string.min': 'O campo password deve ter no mínimo {#limit} caracteres.',
          'any.required': 'O campo password é obrigatório.',
      }),
});

const router = express.Router();

router.post("/users", validateBody(userSchema), userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", authenticate, userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;