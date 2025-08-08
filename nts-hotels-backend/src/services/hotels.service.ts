import prisma from "../prisma/client.js";

type ListParams = {
    q?: string;
    city?: string;
    stars?: string;
    amenities?: string;
    priceMin?: string;
    priceMax?: string;
    from?: string;
    to?: string;
    page?: string;
    pageSize?: string;
    sort?: string;
};

export async function listHotels(params: ListParams) {
    const {
        q, city, stars, amenities, priceMin, priceMax, from, to,
        page = "1", pageSize = "12", sort = "pricePerNight:asc"
    } = params;

    const where: any = {};

    if (q) where.name = { contains: q, mode: "insensitive" };
    if (city) where.city = { equals: city, mode: "insensitive" };
    if (stars) where.stars = { in: stars.split(",").map(Number) };
    if (amenities) where.amenities = { hasEvery: amenities.split(",") };

    if (priceMin || priceMax) {
        const min = priceMin ? Number(priceMin) : 0;
        const max = priceMax ? Number(priceMax) : 999999;
        where.pricePerNight = { gte: min, lte: max };
    }

    if (from || to) {
        const f = from ? new Date(from) : undefined;
        const t = to ? new Date(to) : undefined;
        const left = f ?? t!;
        const right = t ?? f!;
        where.AND = [
            { OR: [{ availableFrom: null }, { availableFrom: { lte: right } }] },
            { OR: [{ availableTo: null }, { availableTo: { gte: left } }] },
        ];
    }

    const [prop, dir] = (sort || "pricePerNight:asc").split(":");
    const take = Math.max(1, Math.min(50, Number(pageSize)));
    const skip = (Math.max(1, Number(page)) - 1) * take;

    const [items, total] = await Promise.all([
        prisma.hotel.findMany({
            where,
            skip,
            take,
            orderBy: { [prop]: dir === "desc" ? "desc" : "asc" }
        }),
        prisma.hotel.count({ where })
    ]);

    return { items, total, page: Number(page), pageSize: take };
}

export function getHotel(id: number) {
    return prisma.hotel.findUnique({ where: { id } });
}

type HotelInput = {
    name: string;
    city: string;
    address?: string | null;
    stars: number;
    pricePerNight: string;
    amenities?: string[];
    images?: string[];
    availableFrom?: string | null;
    availableTo?: string | null;
};

export function createHotel(data: HotelInput) {
    return prisma.hotel.create({
        data: {
            ...data,
            availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
            availableTo: data.availableTo ? new Date(data.availableTo) : null
        }
    });
}

export function updateHotel(id: number, data: Partial<HotelInput>) {
    return prisma.hotel.update({
        where: { id },
        data: {
            ...data,
            availableFrom: data.availableFrom ? new Date(data.availableFrom) : undefined,
            availableTo: data.availableTo ? new Date(data.availableTo) : undefined
        }
    });
}

export function deleteHotel(id: number) {
    return prisma.hotel.delete({ where: { id } });
}
