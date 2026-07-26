function Header() {
    return (
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">controlEscape</h1>
            <nav className="flex gap-6">
                <a href="" className="hover:text-gray-300">Inicio</a>
                <a href="" className="hover:text-gray-300">Populares</a>
                <a href="" className="hover:text-gray-300">Últimos lanzamientos</a>
                <a href="" className="hover:text-gray-300">Reseñas</a>
            </nav>
        </header>
    );
}

export default Header;