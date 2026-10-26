
import { Outlet } from "react-router-dom";
import AnnouncementBar from "../common/AnnouncementBar";
import ScrollToTop from "../common/ScrollToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F3]">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
