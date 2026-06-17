import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashGuideAccessCode } from "../src/lib/guide-access";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/seazone_guest_guide";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const properties = [
  {
    code: "FLN001",
    name: "Apartamento Beira-Mar Florianópolis",
    propertyType: "Apartamento",
    bedroomQuantity: 2,
    bathroomQuantity: 1,
    guestCapacity: 4,
    address: {
      street: "Rua Lauro Linhares",
      number: "589",
      complement: "Apto 301",
      neighborhood: "Trindade",
      city: "Florianópolis",
      state: "SC",
      postal_code: "88036-001",
    },
    operational: {
      wifi_network: "SeaHome_FLN001",
      wifi_password: "floripa2024",
      is_self_checkin: true,
      property_access_type: "smart_lock",
      property_access_instructions:
        "Use o código 4521 na fechadura eletrônica",
      property_password: "4521",
      has_parking_spot: true,
      parking_spot_identifier: "Vaga 12 - subsolo B1",
      parking_spot_instructions: "Portão lateral, código 7890 no interfone",
    },
    rules: {
      check_in_time: "15:00",
      check_out_time: "11:00",
      allow_pet: false,
      smoking_permitted: false,
      suitable_for_children: true,
      suitable_for_babies: true,
      events_permitted: false,
    },
    amenities: {
      wifi: true,
      tv: true,
      air_conditioning: true,
      kitchen: true,
      washing_machine: true,
      elevator: true,
      balcony: true,
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
    ],
    host: {
      name: "Ana Paula",
      phone: "+5548991234567",
    },
  },
  {
    code: "GRM001",
    name: "Chalé Serra Gramado",
    propertyType: "Casa",
    bedroomQuantity: 3,
    bathroomQuantity: 2,
    guestCapacity: 6,
    address: {
      street: "Rua das Hortênsias",
      number: "220",
      complement: null,
      neighborhood: "Planalto",
      city: "Gramado",
      state: "RS",
      postal_code: "95670-000",
    },
    operational: {
      wifi_network: "ChaletSerra_GRM",
      wifi_password: "gramado@2024",
      is_self_checkin: false,
      property_access_type: "keybox",
      property_access_instructions:
        "A chave está no cofre na entrada. Código: 1983",
      property_password: "1983",
      has_parking_spot: true,
      parking_spot_instructions: "Garagem própria para 2 carros",
    },
    rules: {
      check_in_time: "14:00",
      check_out_time: "12:00",
      allow_pet: true,
      smoking_permitted: false,
      suitable_for_children: true,
      suitable_for_babies: false,
      events_permitted: false,
    },
    amenities: {
      wifi: true,
      tv: true,
      kitchen: true,
      bbq_grill: true,
      balcony: true,
      dishwasher: true,
    },
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
    ],
    host: {
      name: "Carlos Eduardo",
      phone: "+5554998765432",
    },
  },
];

const guideAccessCodes = [
  {
    propertyCode: "FLN001",
    code: "FLN001-7KQ9-SEA",
    label: "Acesso de avaliação FLN001",
  },
  {
    propertyCode: "GRM001",
    code: "GRM001-4MZ8-SEA",
    label: "Acesso de avaliação GRM001",
  },
];

async function main() {
  for (const property of properties) {
    await prisma.property.upsert({
      where: { code: property.code },
      update: property,
      create: property,
    });
  }

  for (const access of guideAccessCodes) {
    const property = await prisma.property.findUniqueOrThrow({
      where: { code: access.propertyCode },
    });

    await prisma.guestGuideAccess.upsert({
      where: { tokenHash: hashGuideAccessCode(access.code) },
      update: {
        propertyId: property.id,
        label: access.label,
        expiresAt: null,
        revokedAt: null,
      },
      create: {
        propertyId: property.id,
        tokenHash: hashGuideAccessCode(access.code),
        label: access.label,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
