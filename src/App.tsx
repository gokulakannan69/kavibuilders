import { useState, useEffect } from "react";
import { Navbar, Footer } from "./components/layout";
import { WhatsAppButton } from "./components/common";
import { HomePage, AdminPage, TermsPage, PrivacyPage } from "./pages";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case "#admin":
        return <AdminPage />;
      case "#terms":
        return <TermsPage />;
      case "#privacy":
        return <PrivacyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden w-full">
      <Navbar />
      {renderPage()}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
