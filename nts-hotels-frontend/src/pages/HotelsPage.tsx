import { useState } from "react";
import { useHotels } from "../hooks/useHotels";
import Filters from "../components/Filters";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import type { FiltersState } from "../types/filters";

export default function HotelsPage() {
    const [filters, setFilters] = useState<FiltersState>({
        q: "", city: "", stars: "", amenities: "",
        priceMin: "", priceMax: "", page: 1, pageSize: 12, sort: "pricePerNight:asc",
    });

    const { data, isLoading, isError } = useHotels(filters);
    const items = data?.items ?? [];
    const total = data?.total ?? 0;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hoteles</h1>

            <Filters value={filters} onChange={setFilters} />

            {isLoading && <p>Cargando…</p>}
            {isError && <p className="text-red-600">Error al cargar hoteles.</p>}

            {!isLoading && !isError && (
                <>
                    {items.length === 0 ? (
                        <p>No se encontraron hoteles con esos filtros.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map(h => <HotelCard key={h.id} hotel={h} />)}
                        </div>
                    )}

                    <Pagination
                        page={filters.page}
                        pageSize={filters.pageSize}
                        total={total}
                        onPageChange={(p) => setFilters(f => ({ ...f, page: p }))}
                    />
                </>
            )}
        </div>
    );
}
