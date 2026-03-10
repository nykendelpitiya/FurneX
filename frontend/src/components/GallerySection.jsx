import { motion as Motion } from "framer-motion";
import livingImage from "../assets/living.png";
import diningImage from "../assets/dining.png";
import officeImage from "../assets/office.png";
import bedroomImage from "../assets/bedroom.png";

const galleryItems = [
  {
    id: 1,
    image: livingImage,
    icon: "🛋️",
    title: "Living Room Design",
    description:
      "Modern living room layout with comfortable seating and balanced furniture placement.",
  },
  {
    id: 2,
    image: diningImage,
    icon: "🍽️",
    title: "Dining Room Layout",
    description:
      "Elegant dining space designed for family meals and social gatherings.",
  },
  {
    id: 3,
    image: officeImage,
    icon: "💻",
    title: "Office Workspace",
    description:
      "Simple and productive workspace layout for comfortable daily work.",
  },
  {
    id: 4,
    image: bedroomImage,
    icon: "🛏️",
    title: "Bedroom Interior Layout",
    description:
      "Modern bedroom design with bed, side tables and minimal furniture arrangement.",
  },
];

function GalleryCard({ item, index }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
        <img
          src={item.image}
          alt={item.title}
          className="h-[230px] sm:h-[280px] md:h-[333px] w-full rounded-2xl sm:rounded-3xl object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-4 sm:pt-5">
        <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-black">
          <span className="text-lg sm:text-xl leading-none">{item.icon}</span>
          <span>{item.title}</span>
        </h3>

        <p className="mt-2.5 sm:mt-3 max-w-[95%] text-gray-600 text-sm sm:text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    </Motion.div>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 sm:pb-20">
      <Motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold text-black">Design Gallery</h2>

        <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">
          Explore beautifully designed room layouts created with our smart
          furniture planner to inspire your own interior design ideas.
        </p>
      </Motion.div>

      <div className="mt-8 sm:mt-12 md:mt-14 grid gap-7 sm:gap-8 md:gap-10 md:grid-cols-2">
        {galleryItems.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default GallerySection;
