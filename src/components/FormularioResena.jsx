"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function FormularioResena({ juegoId }) {
  const [contenido, setContenido] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);

    const response = await fetch("/api/resenas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contenido, rating, juegoId }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEnviando(false);
      return;
    }

    setContenido("");
    setRating(5);
    setEnviando(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t pt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Deja tu reseña</h2>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border rounded-lg px-3 py-2 mb-3"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} ⭐</option>
        ))}
      </select>

      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe tu opinión sobre este juego..."
        className="w-full border rounded-lg px-3 py-2 mb-3 h-24"
      />

      <button
        type="submit"
        disabled={enviando}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-50"
      >
        {enviando ? "Enviando..." : "Publicar reseña"}
      </button>
    </form>
  );
}

export default FormularioResena;