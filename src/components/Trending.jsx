import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import { useState, useEffect } from "react";
import axios from "./utils/axios";
import Cards from "./Cards";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title = "Trending | MHUB";
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [loading, setloading] = useState(false);
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();
  // console.log("trending", trending);
  const getTrending = async (pageNum = page) => {
    // setloading(true);
    try {
      let { data } = await axios.get(
        `/trending/${category}/${duration}?page=${pageNum}`
      );
      // console.log("fetch data", data);

      if (data.results.length > 0) {
        settrending((prev) =>
          pageNum === 1 ? data.results : [...prev, ...data.results]
        );
        setpage(pageNum + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    // setloading(false);
  };
  const refreshTrending = async () => {
    setpage(1);
    settrending([]);
    sethasMore(true);
    getTrending(1); // Always fetch page 1 after reset
  };
  useEffect(() => {
    refreshTrending();

    // eslint-disable-next-line
  }, [duration, category]);
  return !trending ? (
    <Loader />
  ) : (
    <div className="w-screen  min-h-screen bg-[#1f1e24]   ">
       <div className="w-full flex items-center justify-between flex-1/2 px-4 md:px-8 py-4">
        {/* Left: Back button and category */}
        <div className="flex items-center  gap-1.5  w-1/3">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl md:text-3xl text-zinc-300 ri-arrow-left-line cursor-pointer"
          ></i>
          <h1 className="md:text-2xl text-xl text-zinc-400 font-semibold">
            Trending
          </h1>
          <h1 className="md:text-2xl w-full text-base md:ml-4 text-shine font-semibold uppercase">
            {category}
          </h1>
        </div>
        {/* Center: TopNav */}
        <div className="md:flex hidden md:justify-center w-1/3">
          <TopNav />
        </div>
        {/* Right: Dropdown */}
        <div className="flex  justify-end items-center  w-1/3">
          <Dropdown
            title="Category"
            func={(e) => setcategory(e.target.value)}
            options={["all", "tv", "movie"]}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<Loader />}
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        // style={{ overflow: 'auto' }}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  );
}

export default Trending;
