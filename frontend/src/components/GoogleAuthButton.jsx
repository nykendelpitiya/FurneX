import { GoogleLogin } from "@react-oauth/google";
import { googleAuthUser } from "../services/authService";

function GoogleAuthButton({ onSuccessLogin, onErrorMessage }) {
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
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        locale="en"
        text="continue_with"
        theme="outline"
        shape="pill"
        size="large"
        logo_alignment="left"
      />
    </div>
  );
}

export default GoogleAuthButton;