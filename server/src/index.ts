import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import cors from "cors";

dotenv.config();

const PORT = 8080;
const api = express();

// middleware
api.use(express.json());
api.use(cors());

// route middleware
api.use("/users", userRoute);

api.get("/", (req, res) => {
  return res.send("Olá!");
});

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
