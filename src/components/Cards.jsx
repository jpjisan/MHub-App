import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

function getRatingColor(rating) {
  if (rating >= 8) return "bg-green-600";
  if (rating >= 6) return "bg-yellow-500";
  if (rating > 0) return "bg-red-500";
  return "bg-zinc-700";
}

function Cards({ data, title }) {
  // console.log("title", title);

  return (
    <div className="w-full flex flex-wrap px-[3%] bg-[#1f1e24] justify-start gap-10 mt-2 pb-10 rounded-lg">
      {data.map((item, index) => {
        const rating =
          item.vote_average?.toFixed(1) || item.popularity?.toFixed() || "N/A";
        const ratingColor = getRatingColor(item.vote_average);

        return (
          <Link
            to={`/${item.media_type || title}/details/${item.id}`}
            key={index}
            className="md:w-[30vh] w-[40vw] h-[35vh] md:h-[50vh] text-lg font-semibold text-zinc-400  hover:scale-110 duration-300 ease-in-out"
            style={{
              animation: `cardFadeIn 0.6s ease-out ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <div className="relative overflow-hidden rounded-t-lg group">
              <img
                className="w-full md:h-[40vh] h-[25vh] object-cover rounded-t-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.8)] transition-transform duration-300 group-hover:scale-105"
                src={
                  item.poster_path ||
                  item.backdrop_path ||
                  item.profile_path ||
                  item.combinedCredits?.[0]?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.poster_path ||
                        item.backdrop_path ||
                        item.profile_path ||
                        item.combinedCredits?.[0]?.backdrop_path
                      }`
                    : noimage
                }
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col px-2 py-1 bg-[#23222b] rounded-b-lg">
              <span className="truncate w-full block hover:text-[#6556cd] transition-colors duration-300">
                {item.title ||
                  item.original_title ||
                  item.name ||
                  item.original_name}
              </span>

              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                  {item.release_date?.slice(0, 4) ||
                    item.first_air_date?.slice(0, 4) ||
                    item.known_for_department ||
                    "N/A"}
                </p>

                <span
                  className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full mt-2 self-end ${ratingColor} hover:animate-[ratingPulse_.7s_ease-in-out]`}
                  title="TMDB Rating"
                >
                  <i className="ri-star-fill text-yellow-300 animate-[shimmer_2s_linear_infinite]"></i>
                  {rating}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Cards;
