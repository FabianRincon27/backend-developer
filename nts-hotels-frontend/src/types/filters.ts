// src/types/filters.ts
export type FiltersState = {
    q: string;
    city: string;
    stars: string;
    amenities: string;
    priceMin: string;
    priceMax: string;
    page: number;
    pageSize: number;
    sort: string;
};
