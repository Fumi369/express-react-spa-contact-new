import express from "express";
import { getPrismaCilent } from "../lib/prisma-util";

const prisma = getPrismaCilent();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const page = req.query["page"] ? Number(req.query["page"] as string) : 1;
    const take = req.query["limit"] ? Number(req.query["limit"] as string) : 25;

    const contacts = await prisma.contact.findMany({
      orderBy: { id: req.query["order"] == "desc" ? "desc" : "asc" },
      skip: (page - 1) * take,
      take,
    });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

export { router };
