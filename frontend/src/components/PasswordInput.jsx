import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({
  label,
  placeholder,
  register,
  name,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium sm:text-[0.95rem]">{label}</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className="w-full rounded-lg border px-3 py-2.5 pr-12 text-sm sm:py-3 sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/40 sm:right-3"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 sm:text-sm">{error.message}</p>
      )}
    </div>
  );
}

export default PasswordInput;