import { Request, Response } from "express";
import * as svc from "../services/hotels.service.js";

export async function listHotels(req: Request, res: Response) {
    try {
        const data = await svc.listHotels(req.query as any);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching hotels" });
    }
}

export async function getHotel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const item = await svc.getHotel(id);
        if (!item) return res.status(404).json({ error: "Hotel not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Error fetching hotel" });
    }
}

export async function addHotel(req: Request, res: Response) {
    try {
        const { name, city, stars, pricePerNight } = req.body || {};
        if (!name || !city || !stars || !pricePerNight) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const hotel = await svc.createHotel(req.body);
        res.status(201).json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating hotel" });
    }
}

export async function editHotel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const exists = await svc.getHotel(id);
        if (!exists) return res.status(404).json({ error: "Hotel not found" });
        const updated = await svc.updateHotel(id, req.body);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating hotel" });
    }
}

export async function removeHotel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const exists = await svc.getHotel(id);
        if (!exists) return res.status(404).json({ error: "Hotel not found" });
        await svc.deleteHotel(id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting hotel" });
    }
}
