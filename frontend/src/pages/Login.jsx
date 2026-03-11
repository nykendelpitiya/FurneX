import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import loginImage from "../assets/login_signup.png";
import { loginSchema } from "../utils/validators";
import { loginUser } from "../services/authService";
import AuthContext from "../context/auth/AuthContext";
import GoogleAuthButton from "../components/GoogleAuthButton";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionForm = motion.form;
const MotionInput = motion.input;
const MotionButton = motion.button;
const MotionP = motion.p;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const rememberedEmail = localStorage.getItem("rememberedEmail") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!rememberedEmail);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail,
      password: "",
    },
  });

  useEffect(() => {
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
    }
  }, [rememberedEmail, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const token = response?.token ?? response?.data?.token;
      const user = response?.user ?? response?.data?.user;

      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (user, token) => {
    login(user, token);
    navigate("/dashboard");
  };

  return (
    <MotionDiv
      className="min-h-screen w-full bg-[#efefef] overflow-x-hidden lg:h-screen lg:overflow-hidden lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Left Side */}
      <div className="w-full lg:w-[45%] bg-[#efefef] flex items-start sm:items-center justify-center px-4 sm:px-8 lg:px-12 py-5 sm:py-8 overflow-y-auto lg:overflow-hidden">
        <MotionDiv
          className="w-full max-w-[460px] py-1 sm:py-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <MotionH1
            variants={itemVariants}
            className="text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-black leading-none text-center mb-4 sm:mb-6 font-serif"
          >
            FurneX
          </MotionH1>

          <MotionH2
            variants={itemVariants}
            className="text-[20px] sm:text-[28px] lg:text-[32px] text-black text-center mb-6 sm:mb-8 font-medium leading-tight"
          >
            Welcome Back to FurneX Login
          </MotionH2>

          <MotionForm
            variants={containerVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Email */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[15px] sm:text-[18px] font-semibold text-black mb-2.5 sm:mb-3">
                Email*
              </label>
              <MotionInput
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="Enter Your Email"
                {...register("email")}
                className="w-full h-[48px] sm:h-[54px] rounded-full border border-[#6f6f6f] bg-transparent px-5 sm:px-6 text-[15px] sm:text-[17px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </MotionDiv>

            {/* Password */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[15px] sm:text-[18px] font-semibold text-black mb-2.5 sm:mb-3">
                Password*
              </label>
              <div className="relative">
                <MotionInput
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  {...register("password")}
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </MotionDiv>

            {/* Remember + Forgot */}
            <MotionDiv
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"
            >
              <label className="flex items-center gap-2 text-[13px] sm:text-[15px] font-medium text-black cursor-pointer">
                <span>Remember me</span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                  className="h-4 w-4 sm:h-5 sm:w-5 accent-[#1f5b2c] cursor-pointer"
                />
              </label>

              <button
                type="button"
                className="self-start sm:self-auto text-[13px] sm:text-[15px] font-medium text-[#355f2e] underline underline-offset-4 hover:text-[#1f5b2c]"
              >
                Forgot Password
              </button>
            </MotionDiv>

            {serverError && (
              <MotionDiv variants={itemVariants}>
                <p className="text-red-500 text-xs">{serverError}</p>
              </MotionDiv>
            )}

            {/* Login Button */}
            <MotionDiv variants={itemVariants} className="pt-2 sm:pt-3">
              <MotionButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mx-auto flex h-[46px] sm:h-[52px] w-full max-w-full min-[420px]:max-w-[220px] items-center justify-center rounded-full bg-[#1f5b2c] text-white text-[16px] sm:text-[18px] font-bold tracking-wide transition hover:opacity-95 disabled:opacity-70"
              >
                {loading ? "Logging in..." : "LOG IN"}
              </MotionButton>
            </MotionDiv>

            {/* Divider */}
            <MotionDiv variants={itemVariants} className="flex items-center gap-2 sm:gap-3 pt-1">
              <div className="h-px flex-1 bg-[#cfcfcf]" />
              <span className="text-[12px] sm:text-[13px] text-[#666]">or continue with</span>
              <div className="h-px flex-1 bg-[#cfcfcf]" />
            </MotionDiv>

            {/* Google Button */}
            <MotionDiv variants={itemVariants}>
              <GoogleAuthButton
                onSuccessLogin={handleGoogleSuccess}
                onErrorMessage={setServerError}
                buttonText="Continue with Google"
                className="mx-auto flex h-[42px] sm:h-[46px] w-full max-w-[250px] items-center justify-center rounded-full border border-[#d7d7d7] bg-white text-[13px] sm:text-[15px] font-medium text-black shadow-sm transition hover:bg-[#f8f8f8]"
              />
            </MotionDiv>

            {/* Signup */}
            <MotionP variants={itemVariants} className="text-center text-[13px] sm:text-[16px] text-black pt-1 leading-relaxed">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#355f2e] e-offset-4 font-medium hover:text-[#1f5b2c]"
              >
                Sign up
              </Link>
            </MotionP>
          </MotionForm>
        </MotionDiv>
      </div>

      {/* Right Side */}
      <MotionDiv
        className="hidden lg:block lg:w-[55%] h-full"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <img
          src={loginImage}
          alt="Furniture login visual"
          className="h-full w-full object-cover"
        />
      </MotionDiv>
    </MotionDiv>
  );
}