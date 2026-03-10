import Navbar from "../components/Navbar";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import video from "../assets/homeuivideo.mp4";
import FeaturesSlider from "../components/FeaturesSlider";
import FeatureDetailsSection from "../components/FeatureDetailsSection";
import GallerySection from "../components/GallerySection";
import DesignStepsSection from "../components/DesignStepsSection";
import CommentsSection from "../components/CommentsSection";
import FooterSection from "../components/FooterSection";

function PublicHome() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#home") {
      const section = document.getElementById("home");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (location.pathname === "/features") {
      const section = document.getElementById("features");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (location.pathname === "/gallery") {
      const section = document.getElementById("gallery");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (location.pathname === "/contact" || location.hash === "#contact") {
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#F6F6F4]">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT CONTENT */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
            Smart Furniture Room Designer
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            Design your room easily with our interactive furniture planner.
            Arrange chairs, tables, and other furniture based on your room
            size and layout preferences. Visualise your designs in both 2D
            and 3D views for a clear and realistic preview. Experiment with
            different layouts, colours, and styles to create the perfect
            living space.
          </p>

          {/* BUTTON */}
          <Link
            to="/signup"
            className="inline-flex bg-[#1F5A2E] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#174724] transition"
          >
            Start Project
          </Link>

          {/* STATS */}
          <div className="flex gap-16 mt-12 flex-wrap">
            <div>
              <h2 className="text-4xl font-semibold text-[#2E2E2E]">300+</h2>
              <p className="text-gray-500 italic text-xl">
                Happy Customers
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold text-[#2E2E2E]">100+</h2>
              <p className="text-gray-500 italic text-xl">
                Furniture Styles
              </p>
            </div>
          </div>
        </Motion.div>

        {/* RIGHT VIDEO PREVIEW */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[420px] object-cover"
            />
          </div>
        </Motion.div>
      </section>

      <section id="features">
        <FeaturesSlider />
      </section>

      <FeatureDetailsSection />

      <section id="gallery">
        <GallerySection />
      </section>

      <DesignStepsSection />
      <CommentsSection />

      <section id="contact">
        <FooterSection />
      </section>
    </div>
  );
}

export default PublicHome;