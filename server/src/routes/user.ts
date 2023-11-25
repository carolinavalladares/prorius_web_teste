import { Router } from "express";
import {
  destroy,
  edit,
  index,
  register,
  restore,
  show,
} from "../controllers/userController";

const route = Router();

// routes

// cadastrar usuário
route.post("/register", register);

// listar todos os usuários
route.get("/list", index);

// mostrar um usuário
route.get("/:id", show);

// editar usuário
route.put("/edit/:id", edit);

// deletar usuário
route.delete("/delete/:id", destroy);

// restaurar usuário
route.get("/restore/:id", restore);

export default route;
