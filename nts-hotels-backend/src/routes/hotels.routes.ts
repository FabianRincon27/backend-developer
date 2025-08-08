import { Router } from "express";
import { addHotel, editHotel, listHotels, removeHotel } from "../services/hotels.controller.js";
import { getHotel } from "../services/hotels.service.js";

const router = Router();

router.get("/", listHotels);
router.get("/:id", getHotel);
router.post("/", addHotel);
router.put("/:id", editHotel);
router.delete("/:id", removeHotel);

export default router;
