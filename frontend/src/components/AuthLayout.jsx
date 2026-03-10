import { motion } from "framer-motion";

function AuthLayout({ children }) {
  const MotionDiv = motion.div;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center px-12">
        <div>
          <h1 className="text-5xl font-bold mb-4">FurneX</h1>
          <p className="text-gray-300 text-lg leading-8 max-w-md">
            Design furniture layouts with a smooth and simple experience.
            Create room ideas, manage designs, and visualize better spaces.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-md">
          <div className="mb-4 rounded-2xl bg-black px-5 py-4 text-white sm:mb-5 md:hidden">
            <h1 className="text-2xl font-bold">FurneX</h1>
            <p className="mt-1 text-sm text-gray-300 leading-6">
              Design furniture layouts quickly and clearly from any device.
            </p>
          </div>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-5 sm:p-7 md:p-10 rounded-2xl shadow-lg w-full"
        >
          {children}
        </MotionDiv>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;