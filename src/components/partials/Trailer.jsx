import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("tv") ? "tv" : "movie";
  const ytvideo = useSelector((state) => state[category].info.video);
  // console.log("trailer", ytvideo);
  const navigate = useNavigate();
  return  ytvideo ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-[#6556cd] bg-gradient-to-br from-[#23222b] to-[#6556cd]/20">
        <i
          onClick={() => navigate(-1)}
          className=" text-3xl text-zinc-300 ri-close-large-fill"
        ></i>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          width="100%"
          height="100%"
          controls
          playing
          style={{ background: "black" }}
        />
      </div>
    </div>
  ): <NotFound />;
}

export default Trailer;
