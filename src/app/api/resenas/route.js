import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para dejar una reseña" },
      { status: 401 }
    );
  }

  const { contenido, rating, juegoId } = await request.json();

  if (!contenido || !rating || !juegoId) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const nuevaResena = await prisma.resena.create({
    data: {
      contenido,
      rating: Number(rating),
      juegoId: Number(juegoId),
      usuarioId: session.user.id,
    },
  });

  return NextResponse.json(nuevaResena);
}