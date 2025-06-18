import React, { useState, useEffect } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import Header from "./partials/Header";
import axios from "./utils/axios";
import { Routes } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loader from "./Loader";
import Copyright from "./Copyright";
import NotFound from "./NotFound";

function Home() {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState("all");
  const [showNav, setShowNav] = useState(false); // Toggle state

  const toggleNav = () => setShowNav(prev => !prev); // Toggle handler

  const getWallpaper = async () => {
    try {
      let { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day"
      );
      setwallpaper(
        data.results[(Math.random() * data.results.length).toFixed()]
      );
    } catch (error) {
      console.log("ERROR :", error);
    }
  };

  const getTrending = async () => {
    setloading(true);
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/week`
      );
      settrending(data.results);
    } catch (error) {
      console.log("ERROR :", error);
    }
    setloading(false);
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getWallpaper();
  }, [category]);

  return !wallpaper || !trending ? (
    <Loader />
  ) : (
    <>
      {/* SideNav Toggle Section */}
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-[#1f1e24] transition-transform duration-300 md:block ${
          showNav ? "translate-x-0 w-[60%]" : "-translate-x-full"
        } md:translate-x-0 md:w-[20%]`}
      >
        <SideNav onLinkClick={() => setShowNav(false)} />
      </div>

      {/* Main Content */}
      <div className="md:w-[80%] w-full overflow-auto ml-0 md:ml-[20%]">
        <div className="w-full h-[10%] flex items-center justify-between bg-[#1f1e24]">
          {/* Toggle Menu Icon on Mobile */}
          <div
            onClick={toggleNav}
            className="text-3xl font-semibold md:hidden w-[10%] p-2 z-999 text-zinc-400 cursor-pointer"
          >
            <i className="ri-menu-2-line"></i>
          </div>
          <TopNav />
        </div>

        <Header data={wallpaper} />
        <HorizontalCards
          data={trending}
          loading={loading}
          cate={category}
          label={category}
          title="Trending"
          category={setcategory}
          opt={["tv", "movie", "all"]}
        />
        <Copyright />
      </div>
    </>
  );
}

export default Home;
