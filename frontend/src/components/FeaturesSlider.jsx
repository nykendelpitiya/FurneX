import { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Armchair,
  Ruler,
  Box,
  Palette,
  Expand,
  Save,
} from "lucide-react";

const FEATURES = [
  {
    id: 1,
    icon: Armchair,
    title: "Furniture Placement",
    description:
      "Easily add and arrange chairs and tables to create the best furniture layout.",
  },
  {
    id: 2,
    icon: Ruler,
    title: "Room Size Customization",
    description:
      "Set room width, length, and shape to match the real room dimensions.",
  },
  {
    id: 3,
    icon: Box,
    title: "2D and 3D Visualisation",
    description:
      "Create a simple top-view layout to arrange furniture and plan the room structure.",
  },
  {
    id: 4,
    icon: Palette,
    title: "Color and Material Selection",
    description:
      "Change wall colors, floor materials, and furniture styles to match your design idea.",
  },
  {
    id: 5,
    icon: Expand,
    title: "Furniture Scaling",
    description:
      "Resize and adjust furniture dimensions to ensure they perfectly fit inside the room.",
  },
  {
    id: 6,
    icon: Save,
    title: "Save and Edit Designs",
    description:
      "Save your room designs and easily edit or update them whenever needed.",
  },
];

// eslint-disable-next-line no-unused-vars
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/70 p-4 md:p-5">
      <div className="shrink-0 pt-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4EC] text-[#1F5A2E]">
          <Icon size={24} strokeWidth={2.2} />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#222222] leading-snug mb-4">
          {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeaturesSlider() {
  const groups = useMemo(() => {
    const result = [];
    for (let i = 0; i < FEATURES.length; i += 3) {
      result.push(FEATURES.slice(i, i + 3));
    }
    return result;
  }, []);

  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % groups.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [groups.length]);

  return (
    <section id="features" className="max-w-7xl mx-auto px-6 pt-20 pb-8 overflow-hidden">
      <div className="flex items-center gap-5 mb-12">
        <div className="w-16 h-[2px] bg-black"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Smart Features
        </h2>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <Motion.div
            key={currentGroup}
            initial={{ opacity: 0, x: 140 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -140 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="grid md:grid-cols-3 gap-10"
          >
            {groups[currentGroup].map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 mt-1">
        {groups.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentGroup(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentGroup === index
                ? "w-8 bg-[#1F5A2E]"
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to feature group ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSlider;