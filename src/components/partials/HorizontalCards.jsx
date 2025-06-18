import React from "react";
import { Link, useLocation } from "react-router-dom";
import noimage from "/noimage.webp";
import Dropdown from "./Dropdown";
import Loader from "../Loader";

function HorizontalCards({ data, category, cate, loading, label, title, opt }) {
  // console.log("hz", data);
  // console.log("hor", data);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full p-3 md:p-5 relative ">
      <div className=" flex justify-between">
        <h1 className="font-bold text-white text-2xl">{title}</h1>
        <Dropdown
          func={(e) => category(e.target.value)}
          title="Filter"
          options={opt}
        />
      </div>
      <p className="text-xl text-zinc-300 font-semibold uppercase">
        Category:{" "}
        <span className="text-xl text-shine font-semibold">{label}</span>
      </p>

      <div className="w-full h-[50vh] md:h-[60vh]  flex gap-4 overflow-x-auto overflow-y-hidden py-4">
        {data?.map((item, index) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            key={index}
            className=" min-w-[50vw] md:min-w-[15vw] h-full  text-white  mt-3  bg-zinc-900 rounded-lg hover:scale-105 duration-250  ease-in-out "
          >
            <img
              className="w-full h-[60%] object-cover rounded-t-lg"
              src={
                item.backdrop_path ||
                item.poster_path ||
                item.profile_path ||
                item.combinedCredits?.[0]?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      item.backdrop_path ||
                      item.profile_path ||
                      item.poster_path ||
                      item.combinedCredits?.[0]?.backdrop_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className="px-3 py-2 ">
              <h1 className="font-semibold">
                {item.title ||
                  item.original_title ||
                  item.name ||
                  item.original_name}
              </h1>
              <p className="text-white tracking-tight leading-4 text-xs mt-1.5">
                {item.overview ? item.overview.slice(0, 45) : item.character}
                {item.overview && item.overview.length > 45 ? (
                  <span className="text-blue-600 cursor-pointer"> more</span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalCards;
