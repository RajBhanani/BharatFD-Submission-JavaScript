import { Router } from "express";
import {
  getFAQs,
  createFAQ,
  updateFAQ,
} from "../controllers/faq.controller.js";

const router = Router();

router.get("/", getFAQs);
router.post("/create", createFAQ);
router.put("/update", updateFAQ);

export default router;
