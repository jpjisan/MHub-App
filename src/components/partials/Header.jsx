import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  // console.log("header", data);

  return (
    <div
      className="w-full md:h-[70%] h-[80%]  flex p-5 pb-10  md:p-10 justify-end items-start flex-col"
      style={{
        background: `
  linear-gradient(
    rgba(0,0,0,0.2),
    rgba(0,0,0,0.3),
    rgba(0,0,0,0.5)
  ),
  url(https://image.tmdb.org/t/p/original/${
    data.poster_path ||
    data.combinedCredits?.[0]?.backdrop_path ||
    data.backdrop_path ||
    data.profile_path
  })
`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1
        className="text-white  text-4xl sm:text-xl md:text-5xl  font-bold"
      >
        {data.title || data.original_title || data.name || data.original_name}
      </h1>
      <p className="text-white tracking-tight md:w-[50%]  mt-2.5">
        {data.overview.slice(0, 200)}...
        <Link className="text-blue-600">more</Link>
      </p>
      <div className="flex gap-2 mt-1.5 text-sm font-medium">
        <p className="text-white">
          <i className=" text-yellow-400 ri-calendar-2-line"></i>{" "}
          {data.release_date || "No Info "}
        </p>
        <p className="text-white uppercase">
          <i className=" text-yellow-400 ri-movie-2-fill"></i> {data.media_type}
        </p>
      </div>
      <Link className=" bg-[#6556cd] py-2 px-5 rounded mt-2 ">
        {" "}
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
