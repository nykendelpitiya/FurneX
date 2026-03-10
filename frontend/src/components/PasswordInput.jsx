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
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className="w-full border rounded-lg p-3 pr-11 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

export default PasswordInput;