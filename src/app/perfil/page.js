import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotonesResena from "@/components/BotonesResena";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function Perfil() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const resenas = await prisma.resena.findMany({
    where: { usuarioId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{session.user.name}</h1>
        <p className="text-gray-500 mb-8">{session.user.email}</p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mis reseñas ({resenas.length})
        </h2>

        {resenas.length === 0 ? (
          <p className="text-gray-500">Aún no has escrito ninguna reseña.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {resenas.map((resena) => (
              <div key={resena.id} className="bg-white rounded-lg shadow p-4">
                <span className="text-yellow-500">⭐ {resena.rating}</span>
                <p className="text-gray-600 mt-2">{resena.contenido}</p>
                <BotonesResena
                  resenaId={resena.id}
                  contenidoActual={resena.contenido}
                  ratingActual={resena.rating}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}