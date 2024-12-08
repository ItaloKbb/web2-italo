import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Usuário ou senha inválidos" });

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Usuário ou senha inválidos" });

    // Gera o token JWT com o ID do usuário no payload
    const token = jwt.sign(
      { id: user.id }, // Payload com o ID do usuário
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Expiração do token
    );

    // Retorna o token no response
    res.status(200).json({ token });
  } catch (err) {
    handleErrorLog(res, err);
  }
};