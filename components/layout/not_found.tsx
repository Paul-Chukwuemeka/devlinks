import React from "react";
import { LandingHeader } from "./landing";
import Link from "next/link";

const Not_found = () => {
  return (
    <div>
      <LandingHeader />
      <main>
        <div className="h-dvh w-full  p-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-text-primary">404</h1>
            <p className="text-xl text-text-secondary mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors shadow-sm cursor-pointer"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Not_found;
