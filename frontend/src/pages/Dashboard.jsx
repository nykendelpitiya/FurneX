import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import AuthContext from "../context/auth/AuthContext";
import dashboardImage from "../assets/dashboard01.png";
import ProjectBoardSection from "../components/dashboard/ProjectBoardSection";

function StatCircle({ value = 70 }) {
  const angle = (value / 100) * 360;

  return (
    <div
      className="relative w-8 h-8 rounded-full"
      style={{
        background: `conic-gradient(#000 0deg ${angle}deg, #e5e7eb ${angle}deg 360deg)`,
      }}
    >
      <div className="absolute inset-[3px] rounded-full bg-white" />
    </div>
  );
}

function StatCard({ title, subtitle, value, total, progress }) {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-[#D7DED2] bg-[linear-gradient(145deg,#FFFFFF_0%,#F2F6EE_100%)] px-4 py-3 shadow-[0_8px_20px_rgba(31,90,46,0.10)] md:min-w-[200px] md:rounded-xl md:border-transparent md:bg-white md:px-5 md:py-4 md:shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
      <div>
        <h3 className="text-base font-semibold text-black md:text-[1.05rem] md:font-medium">{title}</h3>
        <p className="text-xs text-gray-500 md:text-sm">{subtitle}</p>
        <p className="mt-1 text-base font-semibold text-black md:text-[1.05rem]">
          {value} <span className="font-normal text-gray-600">/ {total}</span>
        </p>
      </div>

      <StatCircle value={progress} />
    </div>
  );
}


function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstName = user?.name?.split(" ")[0] || "Jack";
  const greeting = `Welcome back, ${firstName} !`;

  const [showFaqs, setShowFaqs] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Dynamic stats state
  const [activeProjects, setActiveProjects] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [workspaceUsed, setWorkspaceUsed] = useState(0);
  const [workspaceTotal, setWorkspaceTotal] = useState(0);

  // Simulate fetching real stats (replace with real API calls as needed)
  useEffect(() => {
    // Example: fetch from /api/stats or similar endpoint
    // For now, simulate with static values
    setTimeout(() => {
      setActiveProjects(12); // e.g., fetched from backend
      setTotalProjects(40);
      setWorkspaceUsed(9.2); // in GB
      setWorkspaceTotal(15); // in GB
    }, 400);
  }, []);

  const getGreetingClassName = () => {
    if (greeting.length > 28) {
      return "text-lg sm:text-2xl md:text-3xl lg:text-4xl";
    }

    if (greeting.length > 22) {
      return "text-xl sm:text-[1.7rem] md:text-4xl lg:text-[2.8rem]";
    }

    return "text-2xl sm:text-3xl md:text-5xl";
  };

  return (
    <div className="min-h-screen bg-[#F6F6F4]">
      <section className="px-6 pt-0 pb-12 mx-auto -mt-3 max-w-7xl md:pb-16 md:pt-2">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* LEFT SIDE */}
          <Motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1
              className={`mt-12 whitespace-nowrap font-bold leading-tight text-black md:mt-6 ${getGreetingClassName()}`}
            >
              {greeting}
            </h1>

            <p className="max-w-md mt-4 text-lg leading-snug text-gray-700 md:text-2xl">
              Pick up where you left off or start a brand new design
            </p>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative flex justify-center mt-6 md:hidden"
            >
              <Motion.div
                className="absolute inset-x-6 top-8 -z-10 h-[72%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(31,90,46,0.16),_rgba(31,90,46,0.03)_45%,_transparent_72%)] blur-2xl"
                animate={{
                  scale: [0.96, 1.04, 0.98],
                  opacity: [0.45, 0.7, 0.5],
                }}
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />

              <Motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -1, 0.6, 0],
                }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Motion.img
                  src={dashboardImage}
                  alt="Dashboard room preview"
                  className="w-full max-w-[320px] cursor-pointer object-contain"
                  whileHover={{
                    scale: 1.06,
                    y: -14,
                    rotate: -2,
                    filter: "drop-shadow(0 24px 34px rgba(0,0,0,0.2))",
                  }}
                  transition={{ type: "spring", stiffness: 210, damping: 16 }}
                />
              </Motion.div>
            </Motion.div>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="mt-8 rounded-xl bg-[#1F5A2E] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#174724] focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] focus:ring-offset-2 md:px-6 md:py-3 md:text-lg"
            >
              Create new project
            </button>
            <br/><br/>

            <div className="grid gap-3 mt-8 sm:mt-10 sm:gap-4 md:mt-16 md:flex md:flex-wrap md:gap-7">
              <StatCard
                title="Active projects"
                subtitle="In progress this month"
                value={activeProjects}
                total={`${totalProjects} slots`}
                progress={totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0}
              />

              <StatCard
                title="Workspace Usage"
                subtitle="Storage capacity"
                value={workspaceUsed}
                total={`${workspaceTotal} GB`}
                progress={workspaceTotal > 0 ? Math.round((workspaceUsed / workspaceTotal) * 100) : 0}
              />
            </div>
          </Motion.div>

          {/* RIGHT SIDE */}
          <Motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="relative justify-center hidden md:flex md:justify-end"
          >
            <Motion.div
              className="absolute inset-x-10 top-10 -z-10 h-[78%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(31,90,46,0.16),_rgba(31,90,46,0.03)_45%,_transparent_72%)] blur-2xl"
              animate={{
                scale: [0.96, 1.04, 0.98],
                opacity: [0.45, 0.7, 0.5],
              }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            <Motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -1, 0.6, 0],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Motion.img
                src={dashboardImage}
                alt="Dashboard room preview"
                className="w-full max-w-[650px] cursor-pointer object-contain"
                whileHover={{
                  scale: 1.06,
                  y: -14,
                  rotate: -2,
                  filter: "drop-shadow(0 24px 34px rgba(0,0,0,0.2))",
                }}
                transition={{ type: "spring", stiffness: 210, damping: 16 }}
              />
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      <ProjectBoardSection />

      {/* Need Help Section */}
      <section id="dashboard-help-section" className="px-6 pt-12 pb-16 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-black">Need Help?</h2>
          <p className="mt-2 text-gray-500">
            Find answers, guides and support for using FurneX Designer System
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* FAQs */}
          <div className="p-6 bg-white shadow-sm rounded-2xl">
            <h3 className="text-base font-bold text-black">FAQs</h3>
            <p className="mt-2 text-sm text-gray-500">
              Browse frequently asked questions about projects, designs and workspace usage.
            </p>
            <button
              type="button"
              onClick={() => setShowFaqs((prev) => !prev)}
              className="mt-4 text-sm font-semibold text-[#1f5b2c] hover:underline"
            >
              {showFaqs ? "Hide FAQs ↑" : "View FAQs →"}
            </button>
            {showFaqs && (
              <ul className="mt-3 space-y-1.5">
                {["How do I create a new project?", "Can I share my designs?", "How to manage storage?"].map((q) => (
                  <li key={q} className="text-xs text-gray-500">• {q}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Documentation */}
          <div className="p-6 bg-white shadow-sm rounded-2xl">
            <h3 className="text-base font-bold text-black">Documentation</h3>
            <p className="mt-2 text-sm text-gray-500">
              Learn how to create designs, manage projects and use all FurneX tools.
            </p>
            <button
              type="button"
              onClick={() => setShowGuides((prev) => !prev)}
              className="mt-4 text-sm font-semibold text-[#1f5b2c] hover:underline"
            >
              {showGuides ? "Hide Guides ↑" : "Read Guides →"}
            </button>
            {showGuides && (
              <ul className="mt-3 space-y-1.5">
                {["Getting Started Guide", "Design Tools Overview", "Project Management"].map((g) => (
                  <li key={g} className="text-xs text-gray-500">• {g}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Support */}
          <div className="p-6 bg-white shadow-sm rounded-2xl">
            <h3 className="text-base font-bold text-black">Contact Support</h3>
            <p className="mt-2 text-sm text-gray-500">
              Need assistance? Our support team is ready to help you anytime.
            </p>
            <button
              type="button"
              onClick={() => setShowContact((prev) => !prev)}
              className="mt-4 inline-block text-sm font-semibold text-[#1f5b2c] hover:underline"
            >
              {showContact ? "Hide Contact ↑" : "Contact Us →"}
            </button>
            {showContact && (
              <>
                <div className="mt-3 space-y-1">
                  <a
                    href="mailto:support@furnituredesigner.com"
                    className="block text-sm font-semibold text-black hover:text-[#1f5b2c] hover:underline"
                  >
                    support@furnituredesigner.com
                  </a>
                  <p className="text-sm font-semibold text-black">Design Technology Lab</p>
                </div>
                <div className="flex gap-2 mt-4">
                  {[FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                    <button
                      key={i}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:border-[#1f5b2c] hover:text-[#1f5b2c] transition"
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;