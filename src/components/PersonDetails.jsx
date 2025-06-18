import React, { useEffect, useState } from "react";
import { asyncLoadPerson, removePerson } from "../store/actions/peopleAction";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import noimage from "/noimage.webp";
import { useLocation } from "react-router-dom";
import cross from "/cross.jpg";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Copyright from "./Copyright";

export default function PersonDetails() {
  const [scCategory, setscCategory] = useState("all");
  const [category, setcategory] = useState("combined");

  const rt = useLocation();
  const route = rt.pathname;
  // console.log(route);
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("personid", id);
  const { info } = useSelector((state) => state.person);
  // console.log("person info", info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, []);

  const kn = info?.combinedCredits?.cast.filter((item) => item.popularity > 10);
  // console.log("known for", kn);

  return !info ? (
    <Loader />
  ) : (
    <div className=" w-screen  md:px-10 py-5 px-4 text-white min-h-screen ">
      {/* Header Section */}

      <div className=" flex  mb-3 gap-2">
        <i
          onClick={() => navigate(-1)}
          className=" text-3xl text-zinc-300 ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl text-zinc-400 font-semibold">Person</h1>
      </div>

      <div className=" flex w-full gap-10 flex-col md:flex-row justify-center  ">
        <div className=" md:w-[25%] w-full flex flex-row md:flex-col   gap-5">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={
                info.details.poster_path ||
                info.details.backdrop_path ||
                info.details.profile_path ||
                info.details.combinedCredits?.[0]?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      info.details.poster_path ||
                      info.details.backdrop_path ||
                      info.details.profile_path ||
                      info.details.combinedCredits?.[0]?.backdrop_path
                    }`
                  : noimage
              }
              alt="Sydney Sweeney"
              className=" h-[40vh] md:h-[70vh]  object-cover rounded-lg"
            />
            {/* Social Media Icons */}
            <div className="flex gap-5 ">
              <div className="text-3xl rounded flex items-center justify-center cursor-pointer hover:bg-gray-600">
                <a
                  href={`https://x.com/${info.extrenalId.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
              </div>
              <div className="text-3xl  rounded flex items-center justify-center cursor-pointer hover:bg-gray-600">
                <a
                  href={`https://www.instagram.com/${info.extrenalId.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
              <div className="text-3xl  rounded flex items-center justify-center cursor-pointer hover:bg-gray-600">
                <a
                  href={`https://www.tiktok.com/${info.extrenalId.tiktok_id}`}
                ></a>
                <i className="ri-tiktok-fill"></i>
              </div>
            </div>
          </div>
          {/* Personal Info */}
          <div className="flex flex-col md:gap-6 gap-2 text-base md:text-sm">
            <h3 className="text-yellow-400 text-lg font-bold md:mb-2">
              Personal Info
            </h3>

            <div className="flex flex-col md:gap-10 gap-2">
              <div>
                <h2 className=" font-bold text-sm ">Known For:</h2>
                <h3 className="text-sm">{info.details.known_for_department}</h3>
              </div>
              <div>
                <h2 className=" font-bold text-sm ">Known Credits:</h2>
                <h3 className="text-sm">{info.combinedCredits.cast.length}</h3>
              </div>
              <div>
                <h2 className=" font-bold text-sm ">Gender:</h2>
                <h3 className="text-sm">
                  {info.details.gender === 2 ? "Male" : "Female"}
                </h3>
              </div>
              <div>
                <h2 className=" font-bold text-sm ">Birthday:</h2>
                <h3 className="text-sm">{info.details.birthday}</h3>
              </div>
              <div>
                <h2 className=" font-bold text-sm ">Place_of Birth:</h2>
                <h3 className="text-sm">{info.details.place_of_birth}</h3>
              </div>
              <div>
                <h2 className=" font-bold text-sm ">Also Known As:</h2>
                <h3 className="text-sm">{info.details.also_known_as[0]}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className=" md:w-[70%] w-full flex flex-col ">
          <div>
            <h1 className="text-4xl font-bold mb-2">{info.details.name}</h1>

            <div className="mb-4">
              <h2 className="text-yellow-400 font-semibold mb-2">Biography</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                {info.details.biography || "No biography available."}
              </p>
            </div>
          </div>

          <div className=" ">
            <HorizontalCards
              data={kn}
              category={setscCategory}
              cate={scCategory}
              label={scCategory}
              title="Known For"
              opt={["all"]}
            />
          </div>
          {/* Filmography Section */}

          <div className="mt-10 w-full pb-5  mb-5">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-[#6556cd] mb-6">
                Filmography
              </h2>

              <Dropdown
                title="Category"
                func={(e) => setcategory(e.target.value)}
                options={["combined", "movie", "tv"]} // Changed to movie categories
              />
            </div>
            <div className="w-full h-[75vh] overflow-y-auto p-6 rounded-lg shadow-2xl ">
              {info?.[category + "Credits"]?.cast &&
              info[category + "Credits"].cast.length > 0 ? (
                Object.entries(
                  (() => {
                    const reduced = info[category + "Credits"].cast.reduce(
                      (acc, item) => {
                        const year = (
                          item.release_date ||
                          item.first_air_date ||
                          ""
                        ).slice(0, 4);
                        if (!acc[year]) acc[year] = [];
                        acc[year].push(item);
                        return acc;
                      },
                      {}
                    );
                    
                    return reduced;
                  })()
                )
                  .sort((a, b) => b[0].localeCompare(a[0])) // Sort years descending
                  .map(([year, items]) => (
                    // console.log("Year:", year, "Items:", items);

                    <Link
                      to={`/${
                        category === "combined" ? items[0].media_type : category
                      }/details/${items[0].id}`}
                      key={year}
                      className="mb-8 block"
                    >
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {year || "Unknown Year"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item,index) => (
                          <Link
                            key={item.id + index}
                            to={`/${item.media_type}/details/${item.id}`}
                            className="block bg-[#23222b] rounded-lg p-4 mb-2 hover:bg-[#6556cd]/20 transition"
                          >
                            <div className="flex gap-4 items-center">
                              <img
                                src={
                                  item.poster_path
                                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                    : "/noimage.webp"
                                }
                                alt={item.title || item.name}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div>
                                <div className="text-zinc-100 font-medium">
                                  {item.title || item.name}
                                </div>
                                {item.character && (
                                  <div className="text-zinc-400 text-sm">
                                    as {item.character}
                                  </div>
                                )}
                                <div className="text-zinc-500 text-xs">
                                  {item.media_type === "tv"
                                    ? "TV Series"
                                    : "Movie"}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </Link>
                  ))
              ) : (
                <div className="text-zinc-400">No filmography available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* here */}

      {/* Footer Info */}
      <Copyright />
    </div>
  );
}
