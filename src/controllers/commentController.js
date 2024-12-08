import * as commentService from "../services/commentService.js";


export const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByPostId(Number(req.params.postId));
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const userId = req.user.id; // ID do usuário logado (do token)
    const comment = await commentService.updateComment(Number(req.params.id), req.body, userId);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const userId = req.user.id; // ID do usuário logado (do token)
    await commentService.deleteComment(Number(req.params.id), userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};