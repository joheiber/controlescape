import Link from "next/link";
function Header() {
    return (
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
             <Link href="/" className="text-xl font-bold">
        controlEscape
      </Link>
            <nav className="flex gap-6">
                <Link href="/" className="hover:text-gray-300">Inicio</Link>
                <a href="" className="hover:text-gray-300">Populares</a>
                <a href="" className="hover:text-gray-300">Últimos lanzamientos</a>
                <a href="" className="hover:text-gray-300">Reseñas</a>
            </nav>
        </header>
    );
}

export default Header;