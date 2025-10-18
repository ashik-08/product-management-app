"use client";

import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "../../../components/forms/LoginForm";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/products");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="bg-gradient-to-br from-anti-flash-white via-anti-flash-white to-hookersGreen/5">
      <div className="flex items-center justify-center pt-16 px-4 md:pt-24 md:px-0">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-richBlack">Welcome Back</h1>
            <p className="text-hookersGreen/70 text-lg">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="text-center text-sm text-hookersGreen/60 space-y-2">
              <p className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure authentication with JWT tokens</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
