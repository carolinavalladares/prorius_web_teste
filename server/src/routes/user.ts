import { Router } from "express";
import { index, register } from "../controllers/userController";

const route = Router();

// routes
route.post("/register", register);
route.get("/list", index);

export default route;
