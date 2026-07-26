import { useState, useEffect } from "react";
import { Navbar, Footer } from "./components/layout";
import { WhatsAppButton } from "./components/common";
import { HomePage, AdminPage } from "./pages";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden w-full">
      <Navbar />
      {currentRoute === "#admin" ? <AdminPage /> : <HomePage />}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
