"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../lib/api/apiSlice";
import { setCredentials } from "../../lib/store/authSlice";
import { loginSchema } from "../../lib/validations/schemas";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/form";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();

      // Store the token and user info
      dispatch(
        setCredentials({
          token: result.token,
          user: { email: data.email },
        })
      );

      // Redirect to products page
      router.push("/products");
    } catch (err) {
      console.error("Login failed:", err);
      setError("email", {
        type: "manual",
        message:
          err?.data?.message ||
          "Login failed. Please check your email and try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in shadow-lg border-hookersGreen/10">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-hookersGreen to-lion rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-hookers-green" />
        </div>
        <CardTitle className="text-2xl font-bold text-richBlack">
          Sign In
        </CardTitle>
        <CardDescription className="text-hookersGreen/70">
          Enter your email address to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Input
              {...register("email")}
              type="email"
              label="Email Address"
              placeholder="your-email@example.com"
              error={errors.email?.message}
              required
              autoComplete="email"
              disabled={isLoading}
              className="h-12 text-base focus:ring-0 focus:border focus:border-hookers-green"
            />
          </div>

          {error && (
            <div className="p-4 text-sm text-chestnut bg-chestnut/5 border border-chestnut/20 rounded-lg flex items-start space-x-2">
              <div className="w-2 h-2 bg-chestnut rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Authentication Failed</p>
                <p className="text-chestnut/80">
                  {error?.data?.message ||
                    "Please check your email and try again."}
                </p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-hookers-green text-anti-flash-white hover:cursor-pointer font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            disabled={isLoading}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
              {!isLoading && (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </span>
          </Button>
        </form>

        {/* Trust Indicators */}
        <div className="space-y-3 pt-4 border-t border-hookers-green/10">
          <div className="flex items-center justify-center space-x-4 text-xs text-hookersGreen/60">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-hookers-green rounded-full"></div>
              <span>Secure Login</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-lion rounded-full"></div>
              <span>JWT Protected</span>
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm text-hookers-green/60 leading-relaxed">
              By signing in, you agree to our secure authentication process.
              Your session will be protected with industry-standard encryption.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
