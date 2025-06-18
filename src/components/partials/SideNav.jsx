import React from "react";
import { Link } from "react-router-dom";

function SideNav({ onLinkClick = () => {} }) {
  return (
    <div className="h-full  border-r-2 border-zinc-600 p-10">
      <h1 className="text-2xl mt-5 font-bold">
        <i className="text-[#6556cd] ri-tv-fill"></i>
        <span className="m-2 text-white">MHUB </span>
      </h1>

      <nav className="flex flex-col gap-1.5 text-zinc-500">
        <h1 className="text-xl text-white font-semibold mt-3 mb-3">
          New Feeds
        </h1>
        <Link to="/trending" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-clapperboard-ai-fill"></i> Movie
        </Link>
        <Link to="/tv" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link to="/people" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-team-fill"></i> People
        </Link>
      </nav>

      <hr className="mt-3 text-white" />

      <nav className="flex flex-col gap-1.5 text-zinc-500">
        <h1 className="text-xl text-white font-semibold mt-3 mb-3">Web Info</h1>
        <Link to="/about" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-information-fill"></i> About MHUB
        </Link>
        <Link to="/contact" onClick={onLinkClick} className="hover:bg-[#6556cd] hover:text-white duration-300 p-2 rounded-e-lg">
          <i className="mr-1 ri-links-line"></i> Contact US
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
