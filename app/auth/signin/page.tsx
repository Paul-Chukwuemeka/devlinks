import { SignInAction } from "@/app/actions/auth";
import GoogleButton from "@/components/ui/GoogleButton";
import Link from "next/link";
import Logo from "@/components/ui/logo";

const Page = () => {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center p-12 flex-col"
        style={{ backgroundImage: "url('/auth_background.png')" }}
      >
        <div className="flex items-center gap-3">
          <Logo width={40} height={40} color="white" />
          <span className="text-2xl font-bold text-white">DevLinks</span>
        </div>

        <div className="space-y-6 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            All your links,
            <br />
            one simple page.
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Share your content, social profiles, and more with a single link.
            Join thousands of creators using DevLinks.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center max-lg:items-start max-lg:pt-10 p-8 bg-surface-primary">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex  items-center gap-1 justify-center mb-8">
            <Logo width={40} height={40} />
            <span className="text-2xl font-bold">
              DevLinks
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-display font-semibold text-text-primary mb-2">
              Welcome back
            </h2>
    
            <p className="text-body font-medium text-text-secondary">
              Sign in to your account to continue
            </p>
          </div>

          <form action={SignInAction} className="space-y-5">
            <div className="auth-input">
              <input
                type="email"
                name="email"
                required
                className="text-base peer"
              />
              <span className="input-span">
                Email
              </span>
            </div>

            <div className="auth-input">
              <input
                type="password"
                name="password"
                required
                className="text-base peer"
              />
              <span className="input-span">
                Password
              </span>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-body font-medium  hover:text-primary-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className=" w-full h-12 text-base auth-button"
            >
              Sign In
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-body font-medium">
                  OR
                </span>
              </div>
            </div>

            <GoogleButton />
          </form>

          <p className="text-center text-body">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold  hover:text-primary-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
