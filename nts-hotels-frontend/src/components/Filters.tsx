// src/components/Filters.tsx
import { useState } from "react";
import type { FiltersState } from "../types/filters";

type Props = {
    value: FiltersState;
    onChange: React.Dispatch<React.SetStateAction<FiltersState>>;
};

export default function Filters({ value, onChange }: Props) {
    const [local, setLocal] = useState<FiltersState>(value);

    function set<K extends keyof FiltersState>(k: K, val: FiltersState[K]) {
        setLocal((s) => ({ ...s, [k]: val }));
    }

    function apply() {
        onChange({ ...local, page: 1 });
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 mb-4">
            <input className="border p-2 rounded" placeholder="Buscar..."
                value={local.q} onChange={e => set("q", e.target.value)} />
            <input className="border p-2 rounded" placeholder="Ciudad"
                value={local.city} onChange={e => set("city", e.target.value)} />
            <select className="border p-2 rounded" value={local.stars}
                onChange={e => set("stars", e.target.value)}>
                <option value="">Estrellas (todas)</option>
                <option value="5">5</option>
                <option value="4,5">4–5</option>
                <option value="3,4,5">3–5</option>
            </select>
            <input className="border p-2 rounded" placeholder="Amenities (coma)"
                value={local.amenities} onChange={e => set("amenities", e.target.value)} />
            <div className="flex gap-2">
                <input className="border p-2 rounded w-1/2" placeholder="Precio min"
                    type="number" value={local.priceMin} onChange={e => set("priceMin", e.target.value)} />
                <input className="border p-2 rounded w-1/2" placeholder="Precio max"
                    type="number" value={local.priceMax} onChange={e => set("priceMax", e.target.value)} />
            </div>
            <select className="border p-2 rounded" value={local.sort}
                onChange={e => set("sort", e.target.value)}>
                <option value="pricePerNight:asc">Precio ↑</option>
                <option value="pricePerNight:desc">Precio ↓</option>
                <option value="stars:desc">Estrellas ↓</option>
                <option value="stars:asc">Estrellas ↑</option>
            </select>

            <div className="sm:col-span-2 lg:col-span-6 flex gap-2">
                <button className="px-4 py-2 rounded bg-black text-white" onClick={apply}>Aplicar</button>
            </div>
        </div>
    );
}
