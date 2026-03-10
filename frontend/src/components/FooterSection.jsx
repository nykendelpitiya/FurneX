import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import logo from "../assets/logo.png";

function FooterSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/signup", { state: { email } });
  };

  const footerFeatures = [
    "Furniture Placement",
    "Room Size Setup",
    "2D Layout Design",
    "3D Visualization",
    "Save Designs",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="mt-2">
      {/* TOP CTA SECTION */}
      <section id="contact" className="bg-[#F6F6F4] px-6 pt-2 pb-0">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
            Start Designing Your Perfect Room
            <br />
            Today
          </h2>

          <p className="mt-3 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Explore beautifully designed room layouts created with our smart
            furniture planner to inspire your own interior design ideas.
          </p> <br/>

          <form
            onSubmit={handleGetStarted}
            className="mt-8 mx-auto max-w-2xl border border-gray-400 bg-white px-4 py-3.5 min-h-[64px] flex flex-col md:flex-row items-center gap-2 shadow-sm relative z-20"
          >
            <div className="flex items-center gap-2 w-full">
              <Mail className="text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email to start designing"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent py-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto whitespace-nowrap bg-black text-white px-4 py-1.5 text-sm font-semibold hover:bg-[#1F1F1F] transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <section className="relative overflow-hidden text-white px-6 pt-10 pb-8 -mt-4 bg-gradient-to-r from-[#0F3D24] via-[#1F5A2E] to-[#2f713a]">
        {/* Shine / glow layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 -right-16 h-56 w-56 -translate-y-1/2 rounded-full bg-lime-500/30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-xl bg-white/95 px-3 py-2 shadow-lg ring-1 ring-white/60">
              <img
                src={logo}
                alt="Furniture Designer System"
                className="h-12 md:h-9 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
              />
            </div>

            <p className="text-white/90 text-base leading-relaxed max-w-xs">
              Furniture Designer System helps designers create room layouts,
              arrange furniture and visualize designs in 2D and 3D.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Features</h3>

            <ul className="space-y-3">
              {footerFeatures.map((feature) => (
                <li key={feature}>
                  <button
                    type="button"
                    className="text-left text-white/90 text-base transition duration-200 hover:text-white hover:translate-x-1 focus:text-white focus:outline-none"
                  >
                    {feature}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact</h3>

            <div className="space-y-2 mb-8">
              <p className="text-white/90 text-base font-medium">
                support@furnituredesigner.com
              </p>
              <p className="text-white/90 text-base font-medium">
                Design Technology Lab
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={social.label}
                    className="w-11 h-11 bg-white/95 text-[#1F5A2E] flex items-center justify-center transition duration-300 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <SocialIcon size={20} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default FooterSection;