import type { Hotel } from "../api/hotels";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
    return (
        <article className="border rounded-lg p-3 flex flex-col gap-2">
            <img
                src={hotel.images?.[0] ?? "https://picsum.photos/seed/fallback/600/400"}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded"
                loading="lazy"
            />
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{hotel.name}</h3>
                <span className="text-sm">⭐ {hotel.stars}</span>
            </div>
            <p className="text-sm text-gray-600">{hotel.city}</p>
            <p className="font-bold">${hotel.pricePerNight} / noche</p>
            <div className="text-xs text-gray-500 line-clamp-1">
                {hotel.amenities?.join(" · ")}
            </div>
        </article>
    );
}
