import * as userService from "../services/userService.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password,  10);

    // Cria o usuário com a senha criptografada
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body, req.user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(Number(req.params.id), req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};