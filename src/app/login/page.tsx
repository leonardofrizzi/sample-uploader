"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);

    if (success) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card>
          <form onSubmit={handleSubmit}>
            <header className="px-6 pt-6">
              <Badge>Authentication</Badge>
              <h1 className="mt-4 text-lg-semibold text-gray-900">
                Sign In
              </h1>
              <p className="text-sm-regular text-gray-600">
                Enter your credentials to access the platform
              </p>
            </header>
            <section className="flex flex-col gap-4 px-6 mt-6">
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="email" className="text-sm-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@hearsay.com"
                  className="w-full h-11 px-[14px] py-[10px] bg-white border border-gray-300 rounded-lg shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-md-regular text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="password" className="text-sm-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 px-[14px] py-[10px] bg-white border border-gray-300 rounded-lg shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-md-regular text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              {error && (
                <p className="text-sm-regular text-red-500">{error}</p>
              )}
            </section>
            <footer className="flex flex-col items-center gap-4 px-6 pt-6 pb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary text-white border border-primary rounded-lg shadow-[0px_1px_2px_rgba(16,24,40,0.05)] text-md-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-sm-regular text-gray-500">
                Demo: demo@hearsay.com / demo123
              </p>
            </footer>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
