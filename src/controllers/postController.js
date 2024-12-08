import * as postService from "../services/postService.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    // Converte userId para número, caso seja enviado como string
    const post = await postService.createPost({
      title,
      content,
      userId: parseInt(userId, 10),
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convertendo strings para números
    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const data = await postService.getAllPosts(currentPage, pageSize);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getPostsByUserId = async (req, res, next) => {
  try {
    const posts = await postService.getPostsByUserId(Number(req.params.userId));
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostsById = async (req, res, next) => {
  try {
    const posts = await postService.getPostsById(Number(req.params.id));
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // ID do usuário logado (do token)
    const data = req.body;

    const post = await postService.updatePost(Number(id), userId, data);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id; // ID do usuário logado (do token)

    await postService.deletePost(Number(req.params.id), userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};