import { Router } from "express";
import { edit, index, register, show } from "../controllers/userController";

const route = Router();

// routes

// cadastrar usuário
route.post("/register", register);

// listar todos os usuários
route.get("/list", index);

// mostrar um usuário
route.get("/:id", show);

// editar usuário
route.put("/:id", edit);

// deletar usuário

// restaurar usuário

export default route;
