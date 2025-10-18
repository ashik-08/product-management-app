"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../ui/loading";

export function ProtectedRoute({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    };

    // Add a small delay to prevent flash
    const timeout = setTimeout(checkAuth, 100);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router, redirectTo]);

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return children;
}
