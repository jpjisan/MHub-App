import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import { useState, useEffect } from "react";
import axios from "./utils/axios";
import Cards from "./Cards";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  document.title = "People | MHUB";
  const [category, setcategory] = useState("popular");
  // const [duration, setduration] = useState("day");
  // const [loading, setloading] = useState(false);
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();
  console.log(person);
  
  const getPerson = async (pageNum = page) => {
    // setloading(true);
    try {
      let { data } = await axios.get(`/person/${category}?page=${pageNum}`);
      // console.log("fetch data", data);

      if (data.results.length > 0) {
        setperson((prev) =>
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
    setperson([]);
    sethasMore(true);
    await getPerson(1); // Always fetch page 1 after reset
  };
  useEffect(() => {
    refreshTrending();

    // eslint-disable-next-line
  }, [category]);
  return !person ? (
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
            People
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
            options={["popular"]}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<Loader />}
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        // style={{ overflow: 'auto' }}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  );
}

export default People;
