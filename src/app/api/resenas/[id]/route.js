import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { auth } from "@/lib/auth";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const { contenido, rating } = await request.json();

  const resena = await prisma.resena.findUnique({ where: { id } });

  if (!resena) {
    return NextResponse.json({ error: "Reseña no encontrada" }, { status: 404 });
  }

  if (resena.usuarioId !== session.user.id) {
    return NextResponse.json({ error: "No puedes editar esta reseña" }, { status: 403 });
  }

  const resenaActualizada = await prisma.resena.update({
    where: { id },
    data: { contenido, rating: Number(rating) },
  });

  return NextResponse.json(resenaActualizada);
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const resena = await prisma.resena.findUnique({ where: { id } });

  if (!resena) {
    return NextResponse.json({ error: "Reseña no encontrada" }, { status: 404 });
  }

  if (resena.usuarioId !== session.user.id) {
    return NextResponse.json({ error: "No puedes borrar esta reseña" }, { status: 403 });
  }

  await prisma.resena.delete({ where: { id } });

  return NextResponse.json({ mensaje: "Reseña eliminada" });
}