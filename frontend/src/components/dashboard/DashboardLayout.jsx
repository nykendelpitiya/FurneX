import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F6F6F4]">
      <DashboardNavbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 md:px-6 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
