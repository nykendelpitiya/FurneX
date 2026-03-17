import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRightCircle, MoreVertical, Ruler, Building2, Home } from "lucide-react";


const cardHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
    borderColor: "#CFCFC6",
    backgroundColor: "#EEF3EA",
  },
  hover: {
    y: -12,
    scale: 1.02,
    rotateX: -1,
    rotateY: 1.2,
    boxShadow: "0 24px 42px rgba(31,90,46,0.16)",
    borderColor: "#89A47E",
    backgroundColor: "#F6FBF3",
  },
};

const contentHoverVariants = {
  rest: {
    y: 0,
    opacity: 0.92,
  },
  hover: {
    y: -2,
    opacity: 1,
  },
};


// Fetch designs from backend and use as projects

function ProjectCard({ project, index }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      whileHover="hover"
      variants={cardHoverVariants}
      className="group relative overflow-hidden rounded-none border border-[#CFCFC6] bg-[#EEF3EA] p-4 shadow-[0_6px_14px_rgba(0,0,0,0.06)] [transform-style:preserve-3d] sm:p-5"
    >
      <Motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(31,90,46,0.08),transparent_70%)] opacity-0"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div>
        <Motion.div
          className="mb-2 flex justify-end"
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -3, scale: 1.03 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <span className="rounded-full bg-white px-3 py-1 text-[11px] text-gray-700 shadow">
            {project.updated}
          </span>
        </Motion.div>

        <div className="overflow-hidden rounded-sm">
          <Motion.img
            src={project.image}
            alt={project.title}
            className="h-[170px] w-full object-contain sm:h-[180px]"
            animate={{
              y: [0, -6, 3, -4, 0],
              rotate: [0, -1.4, 1, -0.8, 0],
              scale: [1, 1.02, 1.01, 1.03, 1],
            }}
            whileHover={{
              y: -12,
              rotate: -2.5,
              scale: 1.1,
              filter: "saturate(1.1) brightness(1.04) drop-shadow(0 16px 24px rgba(0,0,0,0.18))",
            }}
            transition={{
              y: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.22,
              },
              rotate: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.22,
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.22,
              },
            }}
          />
        </div>
      </div>

      <Motion.div
        className="mt-4 flex items-start justify-between gap-3"
        variants={contentHoverVariants}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <h3 className="text-[1.25rem] font-medium leading-snug text-black sm:text-[1.4rem] md:text-[1.55rem]">
          {project.title}
        </h3>

        <Motion.button
          type="button"
          className="mt-1 text-[#4B5375] transition hover:text-[#1F5A2E]"
          aria-label="Project options"
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: 90, scale: 1.08 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <MoreVertical size={20} />
        </Motion.button>
      </Motion.div>

      <Motion.div
        className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9rem] text-[#4C4C4C]"
        variants={{
          rest: { opacity: 0.9, y: 0 },
          hover: { opacity: 1, y: -1 },
        }}
        transition={{ staggerChildren: 0.04, duration: 0.25 }}
      >
        <Motion.div
          className="flex items-center gap-1.5"
          variants={{ rest: { x: 0 }, hover: { x: 2 } }}
        >
          <Ruler size={14} />
          <span>{project.size}</span>
        </Motion.div>

        <Motion.div
          className="flex items-center gap-1.5"
          variants={{ rest: { x: 0 }, hover: { x: 2 } }}
        >
          <Building2 size={14} />
          <span>{project.type}</span>
        </Motion.div>

        <Motion.div
          className="flex items-center gap-1.5"
          variants={{ rest: { x: 0 }, hover: { x: 2 } }}
        >
          <Home size={14} />
          <span>{project.rooms}</span>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
}


function ProjectBoardSection() {
  const [projects, setProjects] = useState([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5002/api/designs")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.error("Failed to fetch designs:", err));
  }, []);

  useEffect(() => {
    if (projects.length <= 3) return;
    const intervalId = setInterval(() => {
      setActiveProjectIndex((prev) => {
        if (prev + 3 >= projects.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(intervalId);
  }, [projects]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-6 md:pb-14">
      <Motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[1.5rem] border border-[#C9C9C0] bg-[#F8F8F4] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.07)] sm:rounded-[2rem] sm:p-5 md:p-6"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-black sm:text-3xl md:text-4xl">
            Project board
          </h2>
          <button
            type="button"
            className="hidden text-[#4B5375] transition hover:scale-105 hover:text-[#1F5A2E] md:inline-flex"
            aria-label="View more projects"
          >
            <ArrowRightCircle size={34} strokeWidth={2.2} />
          </button>
        </div>

        <div className="hidden gap-4 sm:gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(activeProjectIndex, activeProjectIndex + 3).map((project, index) => (
            <ProjectCard key={project._id} project={{
              id: project._id,
              image: project.previewImage || '',
              updated: project.updatedAt ? `Updated ${new Date(project.updatedAt).toLocaleDateString()}` : '',
              title: project.designName,
              size: project.room ? `${project.room.width} x ${project.room.height}` : '',
              type: project.room?.shape || '',
              rooms: project.furniture ? `${project.furniture.length} items` : '',
            }} index={index} />
          ))}
        </div>

        <div className="md:hidden">
          <AnimatePresence mode="wait">
            {projects.length > 0 && (
              <Motion.div
                key={projects[activeProjectIndex]._id}
                initial={{ opacity: 0, x: 44 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -44 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <ProjectCard project={{
                  id: projects[activeProjectIndex]._id,
                  image: projects[activeProjectIndex].previewImage || '',
                  updated: projects[activeProjectIndex].updatedAt ? `Updated ${new Date(projects[activeProjectIndex].updatedAt).toLocaleDateString()}` : '',
                  title: projects[activeProjectIndex].designName,
                  size: projects[activeProjectIndex].room ? `${projects[activeProjectIndex].room.width} x ${projects[activeProjectIndex].room.height}` : '',
                  type: projects[activeProjectIndex].room?.shape || '',
                  rooms: projects[activeProjectIndex].furniture ? `${projects[activeProjectIndex].furniture.length} items` : '',
                }} index={0} />
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </Motion.div>
    </section>
  );
}

export default ProjectBoardSection;