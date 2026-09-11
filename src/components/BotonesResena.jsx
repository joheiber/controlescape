"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function BotonesResena({ resenaId, contenidoActual, ratingActual }) {
  const [editando, setEditando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [contenido, setContenido] = useState(contenidoActual);
  const [rating, setRating] = useState(ratingActual);
  const router = useRouter();

  async function handleEliminar() {
    const confirmar = confirm("¿Seguro que quieres eliminar esta reseña?");
    if (!confirmar) return;

    setEliminando(true);
    await fetch(`/api/resenas/${resenaId}`, { method: "DELETE" });
    router.refresh();
  }

  async function handleGuardar() {
    await fetch(`/api/resenas/${resenaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contenido, rating }),
    });
    setEditando(false);
    router.refresh();
  }

  if (editando) {
    return (
      <div className="mt-2">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded-lg px-2 py-1 mb-2"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-2 h-20"
        />
        <div className="flex gap-3 text-sm">
          <button onClick={handleGuardar} className="text-green-600 hover:underline">
            Guardar
          </button>
          <button onClick={() => setEditando(false)} className="text-gray-500 hover:underline">
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mt-2 text-sm">
      <button onClick={() => setEditando(true)} className="text-blue-600 hover:underline">
        Editar
      </button>
      <button
        onClick={handleEliminar}
        disabled={eliminando}
        className="text-red-600 hover:underline"
      >
        {eliminando ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  );
}

export default BotonesResena;