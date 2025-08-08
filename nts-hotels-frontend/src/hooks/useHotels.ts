// src/hooks/useHotels.ts
import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../api/hotels";
import type { FiltersState } from "../types/filters";

export function useHotels(params: FiltersState) {
    return useQuery({
        queryKey: ["hotels", params],
        queryFn: () => getHotels(params),
    });
}
