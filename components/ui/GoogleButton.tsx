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
      className="w-full h-12 flex items-center justify-center gap-3 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] hover:border-[var(--border-medium)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-all duration-200"
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-xl text-[var(--text-secondary)]" />
      ) : (
        <FcGoogle className="text-xl" />
      )}
      <span>{isLoading ? "Connecting..." : "Continue with Google"}</span>
    </button>
  );
};

export default GoogleButton;
