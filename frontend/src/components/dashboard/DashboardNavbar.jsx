import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useContext, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import logo from "../../assets/logo.png";

function DashboardNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarSrc = user?.avatar || "";
  const userInitial = (user?.name?.trim()?.[0] || "U").toUpperCase();

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-2.5 py-1.5 text-sm md:text-base font-medium transition-colors duration-200 ${
      isActive ? "text-black" : "text-gray-700 hover:text-[#1F5A2E]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-transparent px-4 pt-3 md:px-6">
      <Motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative isolate mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full border border-white/45 bg-white/25 px-3 py-2 shadow-[0_16px_42px_rgba(12,30,22,0.22),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl backdrop-saturate-150 md:px-6"
        aria-label="Dashboard navigation"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_180%_at_8%_0%,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.22)_42%,rgba(255,255,255,0.04)_100%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(100deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_48%,rgba(190,230,207,0.18)_100%)]"
        />

        <div className="relative z-10 flex w-full items-center justify-between">
          <Link
            to="/dashboard"
            aria-label="FurneX home"
          >
            <img
              src={logo}
              alt="FurneX logo"
              className="h-9 w-auto object-contain md:h-10"
            />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/dashboard" className={navLinkClass}>
              {({ isActive }) => (
                <span className="relative">
                  Dashboard
                  {isActive && (
                    <Motion.span
                      layoutId="dashboardNavUnderline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                    />
                  )}
                </span>
              )}
            </NavLink>

            <NavLink to="/projects" className={navLinkClass}>
              {({ isActive }) => (
                <span className="relative">
                  My Projects
                  {isActive && (
                    <Motion.span
                      layoutId="dashboardNavUnderline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                    />
                  )}
                </span>
              )}
            </NavLink>

            <NavLink to="/templates" className={navLinkClass}>
              {({ isActive }) => (
                <span className="relative">
                  Templates
                  {isActive && (
                    <Motion.span
                      layoutId="dashboardNavUnderline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                    />
                  )}
                </span>
              )}
            </NavLink>

            <NavLink to="/help" className={navLinkClass}>
              {({ isActive }) => (
                <span className="relative">
                  Help
                  {isActive && (
                    <Motion.span
                      layoutId="dashboardNavUnderline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                    />
                  )}
                </span>
              )}
            </NavLink>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="rounded-full bg-[#8B2B2F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#742126] focus:outline-none focus:ring-2 focus:ring-[#8B2B2F] focus:ring-offset-2"
            >
              Log Out
            </Motion.button>

            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={user?.name ? `${user.name} profile` : "User profile"}
                className="h-10 w-10 rounded-full border border-white/60 object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                aria-label="User profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-[#1F5A2E] text-sm font-semibold text-white shadow-sm"
              >
                {userInitial}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] md:hidden"
            aria-label="Toggle dashboard menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </Motion.nav>

      {isMenuOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-3 max-w-7xl rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:hidden"
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              My Projects
            </NavLink>

            <NavLink
              to="/templates"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Templates
            </NavLink>

            <NavLink
              to="/help"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Help
            </NavLink>

            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#8B2B2F] px-14 py-2 text-xs font-semibold text-white transition hover:bg-[#742126]"
              >
                Log Out
              </button>

              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={user?.name ? `${user.name} profile` : "User profile"}
                  className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  aria-label="User profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F5A2E] text-sm font-semibold text-white"
                >
                  {userInitial}
                </div>
              )}
            </div>
          </div>
        </Motion.div>
      )}
    </header>
  );
}

export default DashboardNavbar;