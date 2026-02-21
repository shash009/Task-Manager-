import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-8 py-6 border-t border-white/10 text-white text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm">© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        <p className="text-xs text-gray-300 mt-1">Built with ❤️ — lightweight task management</p>
      </div>
    </footer>
  );
}
