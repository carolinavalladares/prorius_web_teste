import { Router } from "express";
import { index, register, show } from "../controllers/userController";

const route = Router();

// routes
route.post("/register", register);

route.get("/list", index);

route.get("/:id", show);

export default route;
