import { Router } from "express";
import { TwitService } from "./service.js";
import { AuthMiddleware } from "../auth/auth.mid.js";
const router = Router();

const twistService = new TwitService();

router.post("/", AuthMiddleware, (req, res) => {
  if (!req.body?.text?.length) {
    return res.status(400).json({ message: "text is not required" });
  }

  const twit = twistService.createTwit(req.body);
  res.status(200).json(twit);
});

export const twitRouter = router;
