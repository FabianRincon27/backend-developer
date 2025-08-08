import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.hotel.createMany({
        data: [
            {
                name: "Hotel Paradise",
                city: "Cartagena",
                stars: 5,
                pricePerNight: "250.00",
                amenities: ["wifi", "pool", "parking"],
                images: ["https://picsum.photos/seed/1/600/400"]
            },
            {
                name: "Hotel Económico",
                city: "Bogotá",
                stars: 3,
                pricePerNight: "80.00",
                amenities: ["wifi"],
                images: ["https://picsum.photos/seed/2/600/400"]
            }
        ],
        skipDuplicates: true
    });
    console.log("✅ Seed complete");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
