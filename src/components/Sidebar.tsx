import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/ROUTES";

type Page = { name: string; icon: string };
const pages: Page[] = [
  { name: "Website", icon: "🌐" },
  { name: "CV", icon: "📄" },
  { name: "Portfolio", icon: "🖼️" },
  { name: "Contact", icon: "✉️" },
];

type SidebarProps = {
  selected: string;
  setSelected: (page: string) => void;
};

export default function Sidebar({ selected, setSelected }: SidebarProps) {
  const navigate = useNavigate();

  const selectRoute = (page: string) => {
    setSelected(page);
    navigate(ROUTES[page]); 
  };

  return (
    <aside className="w-64 bg-gray-800 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-700 text-xl font-bold bg-gray-900">
        SmartFolio
      </div>
      <nav className="flex-1 py-4">
        {pages.map((page) => (
          <button
            key={page.name}
            onClick={() => selectRoute(page.name)} // ✅ use selectRoute here
            className={`w-full flex items-center gap-3 px-6 py-3 text-lg
              ${selected === page.name
                ? "bg-gray-700 text-white font-semibold"
                : "hover:bg-gray-700 text-gray-300"
              }`}
          >
            <span>{page.icon}</span>
            {page.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
