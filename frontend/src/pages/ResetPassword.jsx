import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import loginImage from "../assets/login_signup.png";
import logo from "../assets/logo.png";
import { resetPasswordWithToken } from "../services/authService";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionInput = motion.input;
const MotionButton = motion.button;

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("Reset token is missing. Please start from forgot password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await resetPasswordWithToken(token, password);

      navigate("/login", {
        state: { email: location.state?.email || "" },
      });
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to reset password. Please try again."
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
            Create New Password
          </MotionH2>

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-[15px] sm:text-[18px] font-semibold text-black mb-2.5 sm:mb-3">
                New Password
              </label>
              <div className="relative">
                <MotionInput
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full h-[48px] sm:h-[54px] rounded-full border border-[#6f6f6f] bg-transparent px-5 sm:px-6 pr-12 sm:pr-14 text-[15px] sm:text-[17px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
                />
                <MotionButton
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-[18px] sm:text-[22px] text-[#5c5c7a]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </MotionButton>
              </div>
            </div>

            <div>
              <label className="block text-[15px] sm:text-[18px] font-semibold text-black mb-2.5 sm:mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <MotionInput
                  whileFocus={{ scale: 1.01 }}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="w-full h-[48px] sm:h-[54px] rounded-full border border-[#6f6f6f] bg-transparent px-5 sm:px-6 pr-12 sm:pr-14 text-[15px] sm:text-[17px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
                />
                <MotionButton
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-[18px] sm:text-[22px] text-[#5c5c7a]"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </MotionButton>
              </div>
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
                {loading ? "Please wait..." : "RESET PASSWORD"}
              </MotionButton>
            </div>

            <p className="text-center text-[13px] sm:text-[16px] text-black pt-1 leading-relaxed">
              Back to{" "}
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
          alt="Furniture reset password visual"
          className="h-full w-full object-cover"
        />
      </MotionDiv>
    </MotionDiv>
  );
}
