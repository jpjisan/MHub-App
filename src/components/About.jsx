import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";

function About() {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-[#1f1e24]">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-4">
        <i
          onClick={() => navigate(-1)}
          className=" text-3xl text-zinc-300 ri-arrow-left-line"
        ></i>
        <div className="w-full h-[10vh] px-[3%] flex items-center">
          <TopNav />
        </div>
      </div>

      <div className="w-full px-[3%] py-8">
        {/* Header Section */}
        <div
          className="text-center mb-12"
          style={{ animation: "fadeIn 0.8s ease-out" }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            About{" "}
            <span className="text-[#6556cd] hover:scale-110 transition-transform duration-300 inline-block">
              MHUB
            </span>
          </h1>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Your Ultimate Entertainment Discovery Platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: "ri-movie-2-line",
              title: "Movies & TV Shows",
              desc: "Discover trending and popular content",
            },
            {
              icon: "ri-search-line",
              title: "Easy Search",
              desc: "Find your favorite entertainment",
            },
            {
              icon: "ri-star-line",
              title: "Ratings & Reviews",
              desc: "Get detailed information and ratings",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#23222b] p-6 rounded-lg hover:scale-105 transition-all duration-300"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              <i
                className={`${feature.icon} text-3xl text-[#6556cd] mb-4 hover:animate-bounce`}
              ></i>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* TMDB Section */}
        <div
          className="bg-[#23222b] p-8 rounded-lg mb-12 text-center"
          style={{
            animation: "fadeIn 0.8s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Powered by TMDB API
          </h2>
          <p className="text-zinc-400 mb-6">
            We use The Movie Database (TMDB) API to provide you with the most
            up-to-date and accurate information.
          </p>
          <Link
            to="/"
            className="bg-[#6556cd] text-white px-6 py-2 rounded-lg hover:bg-[#4c3eb8] transition-all hover:scale-105 duration-300 inline-block"
          >
            Start Exploring
          </Link>
        </div>

        {/* Footer */}
        <div
          className="text-center pb-8"
          style={{
            animation: "fadeIn 0.8s ease-out 0.8s forwards",
            opacity: 0,
          }}
        >
          <p className="text-zinc-400">
            Created by{" "}
            <span className="text-[#6556cd] font-semibold hover:text-white transition-colors duration-300">
              jpjisan
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
