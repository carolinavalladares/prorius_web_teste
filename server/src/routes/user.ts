import { Router } from "express";
import { register } from "../controllers/userController";

const route = Router();

// routes
route.post("/register", register);

export default route;
