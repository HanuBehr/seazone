import { prisma } from "@/lib/db/prisma";
import { demoProperties } from "@/lib/demo-properties";
import { propertySchema, type Property } from "@/lib/validators/property";

const propertyOverrides: Record<string, Partial<Pick<Property, "images" | "name">>> = {
  BNU001: {
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Parque_Vila_Germanica_Blumenau_SC_%2840841592442%29.jpg",
    ],
  },
  FLN001: {
    name: "Apartamento Trindade UFSC",
  },
};

export async function getPropertyByCode(code: string): Promise<Property | null> {
  const normalizedCode = code.toUpperCase();

  try {
    const property = await prisma.property.findUnique({
      where: { code: normalizedCode },
    });

    if (property) {
      const parsedProperty = propertySchema.parse(property);
      return applyPropertyOverride(parsedProperty);
    }
  } catch (error) {
    console.error("Failed to fetch property from database", error);
  }

  const fallbackProperty = demoProperties.find(
    (property) => property.code === normalizedCode,
  );

  return fallbackProperty ? applyPropertyOverride(fallbackProperty) : null;
}

function applyPropertyOverride(property: Property) {
  const override = propertyOverrides[property.code];

  return override ? { ...property, ...override } : property;
}
