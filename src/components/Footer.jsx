function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} controlEscape. Todos los derechos reservados.</p>
        <nav className="flex gap-6 text-sm">
          <a href="" className="hover:text-gray-300">Inicio</a>
          <a href="/populares" className="hover:text-gray-300">Populares</a>
          <a href="/resenas" className="hover:text-gray-300">Reseñas</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;