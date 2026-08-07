import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";
import { CategoryPage } from "./pages/CategoryPage";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

export const App = () => {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog/:slug" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
};
