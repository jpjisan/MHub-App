import React, { useEffect, useState } from "react";
import { asyncLoadTv, removeTv } from "../store/actions/tvActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import noimage from "/noimage.webp";
import { useLocation } from "react-router-dom";
import cross from "/cross.jpg";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Copyright from "./Copyright";

function TvDetails() {
  const { pathname } = useLocation();
  const find = pathname.includes("tv") ? "tv" : "movie";
  const [category, setcategory] = useState(find);
  const rt = useLocation();
  const route = rt.pathname;
  // console.log(route);

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("tvd", id);
  const { info } = useSelector((state) => state.tv);
  // console.log("tv info", info);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, []);

  return !info ? (
    <Loader />
  ) : (
    <div
      className="min-h-screen relative w-screen md:px-18 px-2 py-2"
      style={{
        background: `
      linear-gradient(
        180deg,
        rgba(31, 30, 36, 0.4) 0%,
        rgba(31, 30, 36, 0.75) 50%,
        rgba(31, 30, 36, 0.9) 100%
      ),
      linear-gradient(
        110deg,
        rgba(101, 86, 205, 0.4) 0%,
        rgba(101, 86, 205, 0.2) 50%,
        rgba(31, 30, 36, 0.6) 100%
      ),
      url(https://image.tmdb.org/t/p/original/${
        info.details.belongs_to_collection?.backdrop_path ||
        info.details.backdrop_path ||
        info.details.poster_path ||
        info.details.known_for?.[0]?.backdrop_path ||
        info.details.profile_path
      })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* nav */}
      <nav className="flex info.detailss-center items-center justify-start gap-10 h-[10%]  text-zinc-200">
        <h1 className="text-xl font-bold text-white  ">
          {" "}
          <i
            onClick={() => navigate(-1)}
            className=" text-3xl text-zinc-300 ri-arrow-left-line"
          ></i>
        </h1>
        <div className="flex items-center justify-center gap-3">
          <a href={`${info.details.homepage}`} target="_blank">
            <i className=" hover:text-[#6556cd] text-xl ri-external-link-fill"></i>
          </a>
          <a
            href={`https://www.wikidata.org/wiki/${info.extrenalId.wikidata_id}`}
            target="_blank"
          >
            <i className=" hover:text-[#6556cd] text-xl ri-global-fill"></i>
          </a>
          <a
            href={`https://www.imdb.com/title/${info.extrenalId.imdb_id}`}
            target="_blank"
          >
            {" "}
            <img
              className="hover:scale-105"
              src="../../public/imdb.png"
              alt=""
            />
          </a>
        </div>
      </nav>
      {/* poster and details */}
      <div className="flex flex-col md:w-full   md:flex-row md:gap-20 gap-5 w-full ">
        <div className=" md:w-[30%] w-full flex md:flex-col gap-2  justify-center      ">
          <img
            className=" poster md:w-full md:h-[60vh] w-[50%] h-[40vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.8)]"
            src={
              info.details.poster_path ||
              info.details.backdrop_path ||
              info.details.profile_path ||
              info.details.know_for?.[0]?.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.details.poster_path ||
                    info.details.backdrop_path ||
                    info.details.profile_path ||
                    info.details.combinedCredits?.[0]?.backdrop_path
                  }`
                : noimage
            }
            alt=""
          />
          {/* buy rent stream */}
          <div className="  h-[20%] w-full   ">
            <div className="flex  gap-1 overflow-x-auto items-center justify-start ">
              <h1 className=" md:w-[50%] w-[50%]     md:text-2xl text-xl text-zinc-100 font-semibold">
                {" "}
                Stream :{" "}
              </h1>
              <div className="flex  gap-2  pt-1">
                {info.watchProvider ? (
                  info.watchProvider.flatrate ? (
                    info.watchProvider.flatrate.map((item, index) => (
                      <img
                        key={index}
                        className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                        src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                        alt=""
                      />
                    ))
                  ) : (
                    <img
                      className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                      src="/public/cross.jpg"
                      alt=""
                    />
                  )
                ) : (
                  <img
                    className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                    src="/public/cross.jpg"
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto items-center justify-start">
              <h1 className=" md:w-[50%] w-[50%] md:text-2xl text-xl text-zinc-100 font-semibold">
                {" "}
                Buy :{" "}
              </h1>
              <div className="flex  gap-2 pt-1">
                {info.watchProvider ? (
                  info.watchProvider.buy ? (
                    info.watchProvider.buy.map((item, index) => (
                      <img
                        className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                        src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                        alt=""
                      />
                    ))
                  ) : (
                    <img
                      className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                      src="/public/cross.jpg"
                      alt=""
                    />
                  )
                ) : (
                  <img
                    className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                    src="/public/cross.jpg"
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto items-center justify-start">
              <h1 className=" md:w-[50%] w-[50%]  md:text-2xl text-xl text-zinc-100 font-semibold">
                {" "}
                Rent :{" "}
              </h1>
              <div className="flex  gap-2 pt-1">
                {info.watchProvider ? (
                  info.watchProvider.rent ? (
                    info.watchProvider.rent.map((item, index) => (
                      <img
                        key={index}
                        className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                        src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                        alt=""
                      />
                    ))
                  ) : (
                    <img
                      className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                      src="/public/cross.jpg"
                      alt=""
                    />
                  )
                ) : (
                  <img
                    className="md:w-[7vh] md:h-[7vh] w-[7vw] h-[7vw] object-cover rounded"
                    src="/public/cross.jpg"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="md:w-[70%] w-full  px-2">
            <h1 className="text-4xl text-zinc-100 font-bold">
              {" "}
              {info.details.title ||
                info.details.original_title ||
                info.details.name ||
                info.details.original_name}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    className="text-gray-700"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                  {/* Progress circle */}
                  <circle
                    className="text-[#6556cd]"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 36 * (1 - info.details.vote_average / 10)
                    }`}
                    r="36"
                    cx="40"
                    cy="40"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="1s"
                      fill="freeze"
                      from={2 * Math.PI * 36}
                      to={
                        2 * Math.PI * 36 * (1 - info.details.vote_average / 10)
                      }
                    />
                  </circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {Math.round(info.details.vote_average * 10)}
                    <span className="text-sm">%</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col items-start">
                  <span className="text-zinc-100 text-xl leading-6  font-semibold">
                    User
                  </span>
                  <span className="text-zinc-100 text-xl  leading-6 font-semibold">
                    Score
                  </span>
                </div>
                <div className="text-xs text-zinc-300">
                  {info.details.vote_count.toLocaleString()} votes
                </div>
              </div>
              <Link
                to={`${route}/trailer`}
                className=" bg-[#7c6ce2] py-2 ml-5 text-zinc-100 px-5 rounded mt-2 "
              >
                Watch Trailer
              </Link>
            </div>
            <h1 className="text-zinc-400 italic mt-4 text-lg font-normal">
              {info.details.tagline}
            </h1>
            <div>
              <h1 className="text-zinc-100 font-semibold text-lg ">Overview</h1>
            </div>
            <p className="text-zinc-200 font-normal leading-5 tracking-tighter">
              {" "}
              {info.details.overview}
            </p>
            <div className="flex md:gap-10 gap-2 flex-wrap md:mt-10 mt-5 justify-between   md:items-center md:justify-start">
              {info.castCrew.crew.map((item, index) => (
                <div
                  key={index}
                  className="leading-4  tracking-tighter md:w-[25%] w-[27vw]"
                >
                  <h1 className="text-zinc-100 font-semibold text-lg">
                    {item.name}
                  </h1>
                  <h2 className="text-zinc-300 font-normal italic">
                    {item.job}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full  py-5">
        <div>
          <HorizontalCards
            data={info.castCrew.cast}
            category={setcategory}
            cate={category}
            label="Cast"
            title="Top Billed Cast"
            opt={["all"]}
          />
        </div>
        <div>
          <HorizontalCards
            data={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
            category={setcategory}
            cate={find}
            label={find}
            title="Recommendations"
            opt={[find]}
          />
        </div>
      </div>
        <Copyright />
      <Outlet />
    </div>
  );
}

export default TvDetails;
