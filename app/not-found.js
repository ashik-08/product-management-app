"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="pt-20 md:pt-28 xl:pt-36 bg-gradient-to-br from-anti-flash-white via-anti-flash-white to-hookers-green/5 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-hookersGreen/20 select-none">
            404
          </div>
          <h1 className="text-hookersGreen font-semibold text-lg tracking-wide uppercase">
            Page Not Found
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-richBlack text-4xl font-bold sm:text-5xl leading-tight">
            Oops! Page not found
          </h2>
          <p className="text-hookersGreen/70 text-lg leading-relaxed">
            Sorry, the page you are looking for could not be found or has been
            removed. Let&apos;s get you back to where you need to be.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center space-x-2 py-3 px-6 text-anti-flash-white font-semibold bg-hookers-green hover:bg-hookers-green/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center space-x-2 py-3 px-6 text-hookers-green font-semibold bg-lion/10 hover:bg-lion/20 border-2 border-lion hover:border-lion/80 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
