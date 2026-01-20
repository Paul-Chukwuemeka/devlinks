"use client";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className="auth-button"    >
      {isLoading ? (
        <Loader2 className="animate-spin text-xl" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      <span>{isLoading ? "Connecting..." : "Continue with Google"}</span>
    </button>
  );
};

export default GoogleButton;
