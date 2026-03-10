import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import commentsImage from "../assets/comments.png";

const testimonials = [
  {
    id: 5,
    text: "The furniture planner made client presentations smoother and helped us decide layouts faster.",
    name: "Olivia Hart",
    role: "Interior Stylist",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
  },
  {
    id: 6,
    text: "We could compare multiple room ideas quickly and finalize designs with much more confidence.",
    name: "Noah Miller",
    role: "Space Designer",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    id: 1,
    text: "This room designer helped us visualize furniture layouts easily and present ideas clearly to customers.",
    name: "Emma Grace",
    role: "Interior Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    text: "This tool made it easy to arrange furniture and experiment with different room layouts before finalizing the design.",
    name: "Jack William",
    role: "Furniture Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    text: "The interface is simple and clear. It helped me create layouts faster and explain my design ideas better.",
    name: "Sophia Lee",
    role: "Room Planner",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    text: "Being able to preview the room before finalizing the design improved our workflow and customer confidence.",
    name: "Daniel Scott",
    role: "Design Consultant",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

function CommentCard({ comment }) {
  return (
    <Motion.div
      whileHover={{
        scale: 1.1,
        y: -14,
        zIndex: 30,
        boxShadow: "0 28px 48px rgba(0, 0, 0, 0.38)",
      }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="bg-[#1F5A2E] text-white rounded-none px-8 py-8 min-h-[350px] flex flex-col justify-between shadow-lg will-change-transform"
      style={{ zIndex: 1 }}
    >
      <div>
        <Quote size={28} className="mb-6" />
        <p className="text-[1.45rem] leading-tight font-semibold max-w-[300px]">
          {comment.text}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-8">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h4 className="text-xl font-semibold">{comment.name}</h4>
          <p className="text-base text-white/90">{comment.role}</p>
        </div>
      </div>
    </Motion.div>
  );
}

function CommentsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleComments = Array.from({ length: 4 }, (_, offset) =>
    testimonials[(startIndex + offset) % testimonials.length]
  );

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative">
        {/* Top layout */}
        <div className="grid md:grid-cols-[430px_1fr] gap-8 items-start">
          {/* Left image */}
          <Motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <img
              src={commentsImage}
              alt="Designer comments background"
              className="w-full h-[500px] object-cover object-[center_22%]"
            />
          </Motion.div>

          {/* Right heading */}
          <Motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-2"
          >
            <h2 className="text-4xl font-bold leading-tight max-w-[460px]">
              What Designers Say About Our Tool
            </h2>
          </Motion.div>
        </div>

        {/* Overlapping white rectangle with comments */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={startIndex}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -70 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 md:-mt-80 md:ml-28 bg-white p-3 md:p-5"
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {visibleComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </div>
          </Motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="flex items-center gap-6 mt-5 md:ml-0">
          <button
            type="button"
            onClick={handlePrev}
            className="text-[#4B5375] hover:text-[#1F5A2E] transition"
            aria-label="Previous comments"
          >
            <ChevronLeft size={46} strokeWidth={3.3} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="text-[#4B5375] hover:text-[#1F5A2E] transition"
            aria-label="Next comments"
          >
            <ChevronRight size={46} strokeWidth={3.3} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;