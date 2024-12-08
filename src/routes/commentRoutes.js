import express from "express";
import * as commentController from "../controllers/commentController.js";
import Joi from "joi";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validationMiddleware.js";

export const commentSchema = Joi.object({
    postId: Joi.number()
        .required()
        .messages({
            'number.base': 'O campo postId deve ser um número.',
            'any.required': 'O campo postId é obrigatório.',
        }),
    userId: Joi.number()
        .required()
        .messages({
            'number.base': 'O campo userId deve ser um número.',
            'any.required': 'O campo userId é obrigatório.',
        }),
    content: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'O campo content deve ser um texto.',
            'string.min': 'O campo content deve ter no mínimo {#limit} caracteres.',
            'any.required': 'O campo content é obrigatório.',
        }),
});

const router = express.Router();

router.post("/comments", validateBody(commentSchema), commentController.createComment);
router.get("/posts/:postId/comments", commentController.getCommentsByPostId);
router.put("/comments/:id", authenticate, commentController.updateComment);
router.delete("/comments/:id", authenticate, commentController.deleteComment);

export default router;