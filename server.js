import express from "express";
import { twitRouter } from "./src/twit/controller.js";
import dotenv from "dotenv";
import { AuthMiddleware } from "./src/auth/auth.mid.js";

dotenv.config();

const app = express();

async function main() {
  app.use(express.json());

  app.use("/api/twits", twitRouter);

  app.use(AuthMiddleware);

  app.all("*", (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Что то пошло не так!");
  });

  app.listen(process.env.PORT || 4200, () => {
    console.log("server running 4200");
  });
}
main();
