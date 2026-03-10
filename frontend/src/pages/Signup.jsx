import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import signupImage from "../assets/login_signup.png";
import { signupSchema } from "../utils/validators";
import { registerUser } from "../services/authService";
import GoogleAuthButton from "../components/GoogleAuthButton";
import AuthContext from "../context/auth/AuthContext";

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

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const rememberedEmail = localStorage.getItem("rememberedEmail") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: rememberedEmail,
      password: "",
      confirmPassword: "",
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

      if (data.confirmPassword && data.password !== data.confirmPassword) {
        setServerError("Passwords do not match.");
        return;
      }

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await registerUser(payload);

      // login-style remember email behavior
      localStorage.setItem("rememberedEmail", data.email);

      navigate("/login");
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Signup failed. Please try again."
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
      <div className="w-full lg:w-[45%] bg-[#efefef] flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-12 py-5 sm:py-4 overflow-y-auto lg:overflow-hidden">
        <MotionDiv
          className="w-full max-w-[420px] sm:max-w-[440px] py-1 sm:py-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <MotionH1
            variants={itemVariants}
            className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-black leading-none text-center mb-3 sm:mb-4 font-serif"
          >
            FurneX
          </MotionH1>

          <MotionH2
            variants={itemVariants}
            className="text-[15px] sm:text-[18px] lg:text-[22px] text-black text-center mb-4 sm:mb-5 font-medium"
          >
            Create Your FurneX Account
          </MotionH2>

          <MotionForm
            variants={containerVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            {/* Name */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[13px] sm:text-[16px] font-semibold text-black mb-1.5 sm:mb-2">
                Name
              </label>
              <MotionInput
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder="Enter Your Name"
                {...register("name")}
                className="w-full h-[44px] sm:h-[50px] rounded-full border border-[#6f6f6f] bg-transparent px-4 sm:px-6 text-[13px] sm:text-[15px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </MotionDiv>

            {/* Email */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[13px] sm:text-[16px] font-semibold text-black mb-1.5 sm:mb-2">
                Email
              </label>
              <MotionInput
                whileFocus={{ scale: 1.01 }}
                type="email"
                placeholder="Enter Your Email"
                {...register("email")}
                className="w-full h-[44px] sm:h-[50px] rounded-full border border-[#6f6f6f] bg-transparent px-4 sm:px-6 text-[13px] sm:text-[15px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </MotionDiv>

            {/* Password */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[13px] sm:text-[16px] font-semibold text-black mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <MotionInput
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  {...register("password")}
                  className="w-full h-[44px] sm:h-[50px] rounded-full border border-[#6f6f6f] bg-transparent px-4 sm:px-6 pr-12 sm:pr-14 text-[13px] sm:text-[15px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
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

            {/* Confirm Password */}
            <MotionDiv variants={itemVariants}>
              <label className="block text-[13px] sm:text-[16px] font-semibold text-black mb-1.5 sm:mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <MotionInput
                  whileFocus={{ scale: 1.01 }}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Your password"
                  {...register("confirmPassword")}
                  className="w-full h-[44px] sm:h-[50px] rounded-full border border-[#6f6f6f] bg-transparent px-4 sm:px-6 pr-12 sm:pr-14 text-[13px] sm:text-[15px] text-black placeholder:text-[#9a9a9a] outline-none focus:border-[#1f5b2c] focus:ring-1 focus:ring-[#1f5b2c]"
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

              {errors.confirmPassword && (
                <p className="text-red-600 text-xs sm:text-sm mt-1.5 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </MotionDiv>

            {serverError && (
              <MotionDiv variants={itemVariants}>
                <p className="text-red-500 text-xs">{serverError}</p>
              </MotionDiv>
            )}

            {/* Signup Button */}
            <MotionDiv variants={itemVariants} className="pt-1 sm:pt-2">
              <MotionButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mx-auto flex h-[40px] sm:h-[46px] w-full max-w-[150px] sm:max-w-[180px] items-center justify-center rounded-full bg-[#1f5b2c] text-white text-[13px] sm:text-[16px] font-bold tracking-wide transition hover:opacity-95 disabled:opacity-70"
              >
                {loading ? "Signing up..." : "SIGN UP"}
              </MotionButton>
            </MotionDiv>

            {/* Divider */}
            <MotionDiv variants={itemVariants} className="flex items-center gap-2 sm:gap-3 pt-1">
              <div className="h-px flex-1 bg-[#cfcfcf]" />
              <span className="text-[11px] sm:text-[12px] text-[#666]">or sign up with</span>
              <div className="h-px flex-1 bg-[#cfcfcf]" />
            </MotionDiv>

            {/* Google Button */}
            <MotionDiv variants={itemVariants} className="pt-1">
              <GoogleAuthButton
                onSuccessLogin={handleGoogleSuccess}
                onErrorMessage={setServerError}
                buttonText="Continue with Google"
                className="mx-auto flex h-[42px] sm:h-[46px] w-full max-w-[250px] items-center justify-center rounded-full border border-[#d7d7d7] bg-white text-[13px] sm:text-[15px] font-medium text-black shadow-sm transition hover:bg-[#f8f8f8]"
              />
            </MotionDiv>

            {/* Login Link */}
            <MotionP variants={itemVariants} className="text-center text-[12px] sm:text-[15px] text-black pt-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#355f2e]-offset-4 font-medium hover:text-[#1f5b2c]"
              >
                Log in
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
          src={signupImage}
          alt="Furniture signup visual"
          className="h-full w-full object-cover"
        />
      </MotionDiv>
    </MotionDiv>
  );
}