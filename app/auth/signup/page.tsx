import { SignUpAction } from "@/app/actions/auth";
import GoogleButton from "@/components/ui/GoogleButton";
import Link from "next/link";
import Logo from "@/components/ui/logo";

const Page = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
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
            Start sharing<br />
            in seconds.
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Create your free DevLinks page and share everything you create, 
            curate, and sell online. All from one simple link.
          </p>
        </div>
        

      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-primary">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <Logo width={40} height={40} color="var(--primary-600)" />
            <span className="text-2xl font-bold text-text-primary">DevLinks</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-display text-text-primary mb-2">
              Create an account
            </h2>
            <p className="text-body text-text-secondary">
              Get started with your free DevLinks page
            </p>
          </div>

          <form action={SignUpAction} className="space-y-5">
            <div className="auth-input name rounded-xl h-14 px-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="text-base"
              />
            </div>

            <div className="auth-input rounded-xl h-14 px-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="text-base"
              />
            </div>

            <div className="auth-input password rounded-xl h-14 px-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="text-base"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 text-base"
            >
              Create Account
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface-primary text-text-tertiary font-medium">
                  OR
                </span>
              </div>
            </div>

            <GoogleButton />
          </form>

          <p className="text-center text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
