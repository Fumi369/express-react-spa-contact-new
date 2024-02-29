import express from "express";
import { getPrismaCilent } from "../lib/prisma-util";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json({ message: "Hello World" });
  } catch (err) {
    next(err);
  }
});

export { router };
