"use client";

function BarraFiltros({ opciones, etiquetas, filtroActivo, onFiltrar }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => onFiltrar(opcion)}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            filtroActivo === opcion
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {etiquetas ? etiquetas[opcion] : opcion.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default BarraFiltros;