import axios from "../utils/axios";
import noimage from "/noimage.webp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function TopNav() {
  const [query, setquery] = useState("");
  const [searchData, setsearchData] = useState([]);
  // console.log("SEARCH DATA ;", searchData);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      // console.log("DATA ;", data);
      setsearchData(data.results);
    } catch (error) {
      // console.log("ERROR  ;", error);
    }
  };
  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="md:w-[70%]  w-full  h-full relative flex items-center justify-center  gap-1 text-zinc-400  ">
        <i className="px-2 text-2xl ri-search-2-line"></i>
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className=" outline-none border-none w-[60%]  py-2 md:w-[80%] text-zinc-300"
          type="text"
          placeholder="Search Anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className=" absolute right-10 md:right-30 top-1/2 -translate-y-1/2  text-2xl ri-close-large-line cursor-pointer"
          ></i>
        )}

        <div className="max-h-[50vh] absolute z-99 w-[90%] mx-auto md:left-10  md:w-[80%] top-[100%] left-0.5 bg-zinc-400 rounded-b-lg overflow-auto">
          {searchData.map((item, index) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="w-full  border-b-2 text-zinc-600 border-zinc-200 p-5 text-md font-semibold hover:bg-zinc-500 hover:text-zinc-700 duration-200  flex items-center justify-start gap-2"
            >
              <img
                className="w-[15vh] h-[10vh] object-cover rounded"
                src={
                  item.backdrop_path ||
                  item.profile_path ||
                  item.poster_path ||
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
              <h1>
                {item.title ||
                  item.original_title ||
                  item.name ||
                  item.original_name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
