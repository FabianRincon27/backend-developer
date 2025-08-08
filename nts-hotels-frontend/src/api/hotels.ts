import { api } from "./http";

export type Hotel = {
    id: number; name: string; city: string; stars: number;
    pricePerNight: string; amenities: string[]; images: string[];
    address?: string | null;
};

export type HotelsResponse = {
    items: Hotel[]; total: number; page: number; pageSize: number;
};

export async function getHotels(params: Record<string, unknown>) {
    const { data } = await api.get<HotelsResponse>("/api/hotels", { params });
    return data;
}
