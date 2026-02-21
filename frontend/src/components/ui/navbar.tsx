"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-transparent px-8 py-4 flex justify-between items-center">
      <div className="text-white font-bold">Task Manager</div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-md"
        >
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">U</div>
          <span className="hidden sm:inline">Profile</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white/5 backdrop-blur rounded-md border border-white/10 text-white p-2">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/profile");
              }}
              className="w-full text-left px-2 py-1 hover:bg-white/10 rounded"
            >
              View Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-1 mt-1 text-red-400 hover:bg-white/10 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
