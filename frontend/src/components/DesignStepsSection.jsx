import { motion as Motion } from "framer-motion";
import { PlayCircle, Globe, RotateCcw } from "lucide-react";
import designImage from "../assets/design.png";

const steps = [
  {
    icon: PlayCircle,
    title: "Set Room Dimensions",
    description:
      "Enter the room size including width and length to create an accurate room layout.",
  },
  {
    icon: Globe,
    title: "Arrange Furniture",
    description:
      "Add chairs and tables to the room and arrange them to design the perfect layout.",
  },
  {
    icon: RotateCcw,
    title: "Preview Your Design",
    description:
      "Switch between 2D layout and 3D view to explore how the final room will look.",
  },
];

function DesignStepsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-18 md:pb-24">
      <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">

        {/* LEFT SIDE */}
        <Motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 sm:mb-10 md:mb-12">
            Designing Your Dream in <br className="hidden sm:block" /> Three Simple Steps
          </h2>

          <div className="relative">

            {/* vertical line */}
            <div className="absolute left-5 sm:left-6 top-6 sm:top-8 bottom-6 sm:bottom-8 w-[2px] bg-gray-300"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="flex gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 relative">

                  {/* ICON */}
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white z-10">
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md pr-1">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </Motion.div>


        {/* RIGHT SIDE IMAGE */}
        <Motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-first md:order-none"
        >
          <img
            src={designImage}
            alt="Design example"
            className="rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-full md:max-w-[460px] object-cover"
          />
        </Motion.div>

      </div>
    </section>
  );
}

export default DesignStepsSection;