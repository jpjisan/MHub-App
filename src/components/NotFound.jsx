import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1f1e24] text-white">
      <h1 className="text-7xl font-extrabold text-[#6556cd] mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-zinc-400 mb-8 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#6556cd] rounded-lg text-white font-semibold hover:bg-[#4c3eb8] transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
