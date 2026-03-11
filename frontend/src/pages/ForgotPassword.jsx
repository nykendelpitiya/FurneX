import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginImage from "../assets/login_signup.png";
import logo from "../assets/logo.png";
import { requestPasswordReset } from "../services/authService";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionInput = motion.input;
const MotionButton = motion.button;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await requestPasswordReset(email);

      if (response?.resetToken) {
        navigate(`/reset-password?token=${response.resetToken}`, {
          state: { email },
        });
        return;
      }

      setError("Unable to start password reset. Please try again.");
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Failed to request password reset. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionDiv
      className="min-h-screen w-full bg-[#efefef] overflow-x-hidden lg:h-screen lg:overflow-hidden lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full lg:w-[45%] bg-[#efefef] flex items-start sm:items-center justify-center px-4 sm:px-8 lg:px-12 py-5 sm:py-8 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-[460px] py-1 sm:py-2">
          <MotionDiv className="mb-4 text-center sm:mb-6">
            <Link to="/#home" aria-label="FurneX home" className="inline-flex items-center justify-center">
              <img
                src={logo}
                alt="FurneX logo"
                className="h-12 w-auto object-contain sm:h-14 md:h-16"
              />
            </Link>
          </MotionDiv>

          <MotionH2 className="text-[20px] sm:text-[28px] lg:text-[32px] text-black text-center mb-6 sm:mb-8 font-medium leading-tight">
            Reset Your Password
          </MotionH2>

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-[15px] sm:text-[18px] font-semibold text-black mb-2.5 sm:mb-3">
                Email
              </label>
              <MotionInput
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full h-[48px] sm:h-[54px] rounded-full border border-[#6f6f6f] bg-transparent px-5 sm:px-6 text-[15px] sm:text-[17px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="pt-2 sm:pt-3">
              <MotionButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mx-auto flex h-[46px] sm:h-[52px] w-full max-w-full min-[420px]:max-w-[220px] items-center justify-center rounded-full bg-[#1f5b2c] text-white text-[16px] sm:text-[18px] font-bold tracking-wide transition hover:opacity-95 disabled:opacity-70"
              >
                {loading ? "Please wait..." : "CONTINUE"}
              </MotionButton>
            </div>

            <p className="text-center text-[13px] sm:text-[16px] text-black pt-1 leading-relaxed">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-[#355f2e] font-medium hover:text-[#1f5b2c]"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <MotionDiv
        className="hidden lg:block lg:w-[55%] h-full"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <img
          src={loginImage}
          alt="Furniture forgot password visual"
          className="h-full w-full object-cover"
        />
      </MotionDiv>
    </MotionDiv>
  );
}
