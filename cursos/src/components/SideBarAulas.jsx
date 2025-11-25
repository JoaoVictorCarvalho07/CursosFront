import { Link } from "react-router-dom";

export default function SidebarAulas({ aulas, aulaAtualId, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* BACKDROP MOBILE */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-gray-900 border-l border-gray-800 z-50 
          transform transition-transform duration-300 
          ${mobileOpen ? "translate-x-0" : "translate-x-full"} 
          lg:static lg:translate-x-0 lg:w-80 
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700 lg:hidden">
          <h2 className="text-xl font-semibold">Aulas</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 text-2xl"
          >
            ✕
          </button>
        </div>

        <ul className="p-4 flex flex-col gap-3">
          {aulas.map(aula => (
            <Link
              key={aula.id}
              to={`/aula/${aula.id}`}
              className={`
                p-3 rounded-lg transition block
                ${aula.id === aulaAtualId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"}
              `}
              onClick={() => setMobileOpen(false)}
            >
              {aula.titulo} 
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
