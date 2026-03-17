import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleAuthUser } from "../services/authService";

function GoogleAuthButton({
  onSuccessLogin,
  onErrorMessage,
  buttonText = "Continue with Google",
  className = "",
}) {
  const handleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        onErrorMessage("Google authentication failed.");
        return;
      }

      const data = await googleAuthUser(credential);

      onSuccessLogin(data.user, data.token);
    } catch (error) {
      onErrorMessage(
        error.response?.data?.message || "Google login failed. Please try again."
      );
    }
  };

  const handleError = () => {
    onErrorMessage("Google sign-in was unsuccessful.");
  };

  return (
    <div className="w-full flex justify-center px-1 sm:px-0">
      <div className="w-full max-w-[360px] sm:max-w-[420px]">
        <div
          className={`relative mx-auto flex min-h-[46px] w-full items-center justify-center overflow-hidden rounded-full border border-[#d7d7d7] bg-white text-black shadow-sm ${className}`.trim()}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 px-5">
            <FcGoogle className="shrink-0 text-[20px] sm:text-[22px]" />
            <span className="text-[14px] font-medium sm:text-[15px]">
              {buttonText}
            </span>
          </div>

          <div className="absolute inset-0 opacity-[0.01]">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              locale="en"
              text="continue_with"
              theme="outline"
              shape="pill"
              size="large"
              logo_alignment="left"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuthButton;