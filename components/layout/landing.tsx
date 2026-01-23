import Link from "next/link";
import Logo from "@/components/ui/logo";
import {
  ArrowRight,
  BarChart3,
  Layout,
  Palette,
  Share2,
  Smartphone,
} from "lucide-react";

type FeatureCardType = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  description: string;
  className?: string;
}

export const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-primary/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary-600 rounded-lg p-1.5 text-white">
            <Logo width={24} height={24} color="white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-text-primary">
            devlinks
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors shadow-sm cursor-pointer"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardType) => (
  <div
    className={`p-6 rounded-2xl bg-surface-secondary border border-border-light hover:border-border-medium transition-colors ${className}`}
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-primary flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            v1.0 Now Available
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary mb-8 animate-slide-in-left">
            Everything you are.
            <br />
            <span className="text-primary-600">In one simple link.</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-in-right">
            Join 25M+ people using DevLinks for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter and other social media profiles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in">
            <Link
              href="/auth/signup"
              className="h-14 px-8 rounded-full bg-neutral-900 text-white font-bold text-lg flex items-center gap-2 hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl"
            >
              Claim your Link
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/admin"
              className="h-14 px-8 rounded-full bg-surface-secondary text-text-primary font-bold text-lg flex items-center gap-2 border border-border-medium hover:bg-surface-tertiary transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Palette}
            title="Customizable Themes"
            description="Make your DevLink pop with our built-in themes. Choose from predefined color palettes or create your own to match your brand identity perfectly."
          />
          <FeatureCard
            icon={BarChart3}
            title="Detailed Analytics"
            description="Track your engagement with built-in analytics. See who clicks what and when, so you can optimize your content strategy."
          />
          <FeatureCard
            icon={Share2}
            title="Share Anywhere"
            description="One link for all your platforms. Share your DevLink on Instagram, TikTok, Twitter, LinkedIn, and anywhere else your audience lives."
          />
        </div>

        <div className="mt-24 max-w-4xl mx-auto bg-surface-tertiary rounded-3xl p-12 border border-border-light text-center">
          <h2 className="text-3xl font-bold mb-6">
            Built for Developers, Creators, and You.
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Start your journey today and consolidate your digital presence.
          </p>
          <Link
            href="/auth/signup"
            className="text-primary-600 font-bold hover:underline text-lg"
          >
            Get Started for Free &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-secondary border-t border-border-light py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-neutral-900 rounded-md p-1">
              <Logo width={20} height={20} color="white" />
            </div>
            <span className="font-bold text-text-primary">devlinks</span>
          </div>
          <div className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} DevLinks Inc using Tailwind v4.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
