import { Request, Response } from "express";
import { IUserData } from "../types";
import { validateEditData, validateUserData } from "../utils/validate";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { omitPassword } from "../utils/omitPassword";

const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword, role }: IUserData = req.body;

  //   verificar se todas as informações necessárias foram enviadas
  if (!name || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({
      message:
        "Não foi possível cadastrar o usuário... Por favor forneça todas as informações.",
    });
  }

  //   validar informações

  const roleUppercase = role.toUpperCase();

  const { error } = validateUserData({
    name,
    email,
    password,
    confirmPassword,
    role: roleUppercase,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: "Falha ao validar dados do usuário...", error });
  }

  // checar se usuário já existe
  const nameExists = await prisma.user.findFirst({
    where: { name: name.toLowerCase() },
  });
  const emailExists = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (nameExists || emailExists) {
    return res
      .status(400)
      .json({ message: "Este usuário já está cadastrado..." });
  }

  // criptografar senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    role: roleUppercase,
  };

  try {
    const user = await prisma.user.create({
      data: { ...userData },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso.",
      user: omitPassword(user),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Não foi possível registrar o usuário..." });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ where: { deleted: false } });

    // omitir a senha de todos os usuários da lista
    const usersNoPassword = users.map((user) => omitPassword(user));

    return res.status(200).json({ users: usersNoPassword });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const indexDeleted = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ where: { deleted: true } });

    // omitir a senha de todos os usuários da lista
    const usersNoPassword = users.map((user) => omitPassword(user));

    return res.status(200).json({ users: usersNoPassword });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idNumber = Number(id);

  try {
    const user = await prisma.user.findUnique({ where: { id: idNumber } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado..." });
    }

    return res.status(200).json({ user: omitPassword(user) });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, email, role }: IUserData = req.body;

  //   verificar se todas as informações necessárias foram enviadas
  if (!name || !email || !role) {
    return res.status(400).json({
      message:
        "Não foi possível editar o usuário... Por favor forneça todas as informações.",
    });
  }

  const userData = {
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    role: role.toUpperCase(),
  };

  const { error } = validateEditData({
    ...userData,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: "Falha ao validar dados do usuário...", error });
  }

  const idNumber = Number(id);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: idNumber },
      data: { ...userData },
    });

    return res.status(200).json({
      user: omitPassword(updatedUser),
      message: "Usuário atualizado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  const numberId = Number(id);

  try {
    const user = await prisma.user.findFirst({ where: { id: numberId } });

    if (!user) {
      return res.status(400).json({ message: "Este usuário não existe..." });
    }

    const deletedUser = await prisma.user.update({
      where: { id: numberId },
      data: { deleted: true },
    });

    return res.status(200).json({
      message: "Usuário deletado com sucesso.",
      user: omitPassword(deletedUser),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Falha ao deletar usuário...", error });
  }
};

const restore = async (req: Request, res: Response) => {
  const { id } = req.params;

  const numberId = Number(id);

  try {
    const user = await prisma.user.update({
      where: { id: numberId },
      data: { deleted: false },
    });

    return res.status(200).json({
      message: "Usuário restaurado com sucesso.",
      user: omitPassword(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Falha ao restaurar usuário..." });
  }
};

export { register, index, indexDeleted, show, edit, destroy, restore };
