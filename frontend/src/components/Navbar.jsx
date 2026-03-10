import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useContext, useState } from "react";
import AuthContext from "../context/auth/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-2.5 py-1.5 text-sm md:text-base font-medium transition-colors duration-200 ${
      isActive ? "text-black" : "text-gray-700 hover:text-[#1F5A2E]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-transparent px-2 pt-2 sm:px-4 sm:pt-3 md:px-6">
      <Motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative isolate mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-2xl border border-white/45 bg-white/25 px-2.5 py-1.5 shadow-[0_16px_42px_rgba(12,30,22,0.22),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl backdrop-saturate-150 sm:rounded-full sm:px-3 sm:py-2 md:px-6"
        aria-label="Main navigation"
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
        {/* Logo */}
        <Link
          to="/#home"
          aria-label="FurneX home"
        >
          <img
            src={logo}
            alt="FurneX logo"
            className="h-8 w-auto object-contain sm:h-9 md:h-10"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/#home" className={navLinkClass}>
            {({ isActive }) => (
              <span className="relative">
                Home
                {isActive && (
                  <Motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                  />
                )}
              </span>
            )}
          </NavLink>

          <NavLink to="/features" className={navLinkClass}>
            {({ isActive }) => (
              <span className="relative">
                Features
                {isActive && (
                  <Motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                  />
                )}
              </span>
            )}
          </NavLink>

          <NavLink to="/gallery" className={navLinkClass}>
            {({ isActive }) => (
              <span className="relative">
                Gallery
                {isActive && (
                  <Motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                  />
                )}
              </span>
            )}
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            {({ isActive }) => (
              <span className="relative">
                Contact
                {isActive && (
                  <Motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#1F5A2E]"
                  />
                )}
              </span>
            )}
          </NavLink>
        </div>

        {/* Desktop Right Button */}
        <div className="hidden md:flex">
          {!isAuthenticated ? (
            <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#1F5A2E] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174724] focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </Motion.div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#1F5A2E] transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] focus:ring-offset-2"
              >
                Dashboard
              </Link>

              <Motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="rounded-full bg-[#1F5A2E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174724] focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] focus:ring-offset-2"
              >
                Logout
              </Motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] sm:h-10 sm:w-10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
        </div>
      </Motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-1 mt-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:mx-auto sm:mt-3 sm:max-w-7xl sm:rounded-3xl sm:p-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/#home"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Home
            </NavLink>

            <NavLink
              to="/features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Features
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Gallery
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#1F5A2E]"
            >
              Contact
            </NavLink>

            <div className="pt-2">
              {!isAuthenticated ? (
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-full bg-[#1F5A2E] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#174724]"
                >
                  Sign Up
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-full border border-[#1F5A2E] px-5 py-2.5 text-center text-sm font-semibold text-[#1F5A2E]"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-[#1F5A2E] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </Motion.div>
      )}
    </header>
  );
}

export default Navbar;