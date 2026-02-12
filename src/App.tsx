import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CV from "./pages/CV";
import Website from "./pages/Website";
import DefaultPage from "./pages/DefaultPage";
import ROUTES from "./constants/ROUTES";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { CreatorProvider } from "./context/CreatingSiteProvider";

export default function App() {
  const [selected, setSelected] = useState("");
  const location = useLocation();

  return (
    <div className="h-screen w-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar only rendered when the user logs in or signs up */}
      {location.pathname !== ROUTES.Home && location.pathname !== ROUTES.Signup && (
        <Sidebar selected={selected} setSelected={setSelected} />
      )}

      {/* Main Content */}
      <CreatorProvider>
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path={ROUTES.Home} element={<Login />} />
            <Route path={ROUTES.Signup} element={<Signup />} />
            <Route path={ROUTES.Default} element={<DefaultPage />} />
            <Route path={ROUTES.Website} element={<Website />} />
            <Route path={ROUTES.CV} element={<CV />} />
          </Routes>
        </main>
      </CreatorProvider>
    </div>
  );
}
