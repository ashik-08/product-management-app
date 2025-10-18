"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../lib/api/apiSlice";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../lib/store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    user,
    login,
    logout: handleLogout,
    requireAuth,
    isLoginLoading,
    loginError,
  };
}
