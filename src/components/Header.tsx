"use client";

import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const Header = memo(function Header() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-12 md:py-6">
      <Image
        src="/images/hearsay.webp"
        alt="Hearsay"
        width={125}
        height={52}
      />
      <span className="text-sm-semibold text-gray-200">
        Case Details
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center px-3 py-2 md:w-[139px] md:h-[44px] md:px-[18px] md:py-[10px] gap-2 bg-primary border border-primary rounded-lg shadow-xs hover:opacity-90 transition-opacity"
      >
        <span className="text-md-semibold text-white">Exit Case</span>
      </button>
    </header>
  );
});
