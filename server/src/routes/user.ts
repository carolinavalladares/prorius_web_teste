import { Router } from "express";
import {
  destroy,
  edit,
  index,
  indexDeleted,
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

// listar todos os usuários deletados
route.get("/list-deleted", indexDeleted);

// mostrar um usuário
route.get("/:id", show);

// editar usuário
route.patch("/edit/:id", edit);

// deletar usuário
route.delete("/delete/:id", destroy);

// restaurar usuário
route.patch("/restore/:id", restore);

export default route;
