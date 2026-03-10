import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import moreImage from "../assets/more.png";

const featureGroups = [
  [
    {
      title: "Room Size Configuration",
      description:
        "Set room width, length, and shape accurately to match the real room dimensions before placing furniture.",
    },
    {
      title: "2D and 3D Visualization",
      description:
        "Preview the room in both 2D and 3D modes so designers and customers can understand the final look clearly.",
    },
    {
      title: "Furniture Arrangement",
      description:
        "Add, move, and position furniture items easily to create a clean and practical room layout.",
    },
  ],
  [
    {
      title: "Color and Material Selection",
      description:
        "Change wall colors, flooring materials, and furniture finishes to match your preferred interior style.",
    },
    {
      title: "Furniture Scaling",
      description:
        "Resize furniture items to fit the available room space properly and maintain a realistic design layout.",
    },
    {
      title: "Save and Edit Designs",
      description:
        "Save created room designs and reopen them later for editing, updating, or improving the layout.",
    },
  ],
];

function FeatureRow({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-300 py-3 sm:py-3.5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="text-base sm:text-lg font-medium text-[#3A3A3A]">{item.title}</span>
        <span className="text-xl sm:text-2xl leading-none text-[#4B5375]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.p
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-sm leading-relaxed text-gray-600 pr-2 sm:pr-8"
          >
            {item.description}
          </Motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureDetailsSection() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const currentFeatures = featureGroups[currentGroup];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleGroupChange = () => {
    setCurrentGroup((prev) => (prev === 0 ? 1 : 0));
    setOpenIndex(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10">
      <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* LEFT IMAGE */}
        <Motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="w-full order-first md:order-none"
        >
          <img
            src={moreImage}
            alt="Room layout planning preview"
            className="w-full max-w-full md:max-w-[380px] h-auto object-cover"
          />
        </Motion.div>

        {/* RIGHT CONTENT */}
        <Motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black mb-3 sm:mb-4">
            Plan Your Perfect Room Layout
          </h2>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-[560px] mb-5 sm:mb-6">
            Our room design system allows designers to create furniture layouts
            by setting room dimensions, adding furniture and previewing designs
            in both 2D and 3D environments.
          </p>

          <div>
            {currentFeatures.map((item, index) => (
              <FeatureRow
                key={item.title}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleGroupChange}
            className="mt-5 sm:mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#1F5A2E] px-5 sm:px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#174724] w-full sm:w-auto"
          >
            {currentGroup === 0 ? "More →" : "← Back"}
          </button>
        </Motion.div>
      </div>
    </section>
  );
}

export default FeatureDetailsSection;