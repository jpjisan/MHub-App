export { removeMovie } from "../reducers/movieSlice";
import axios from "../../components/utils/axios";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (movieId) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${movieId}`);
    const extrenalId = await axios.get(`/movie/${movieId}/external_ids`);
    const recommendations = await axios.get(
      `/movie/${movieId}/recommendations`
    );
    const similar = await axios.get(`/movie/${movieId}/similar`);
    const video = await axios.get(`/movie/${movieId}/videos`);
    const watchProvider = await axios.get(`/movie/${movieId}/watch/providers`);
    const castCrew = await axios.get(`/movie/${movieId}/credits`);

    let theUltimateDetails = {
      details: details.data,
      extrenalId: extrenalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      video: video.data.results.find((m) => m.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN,
      castCrew: {
        cast: castCrew.data.cast,
        crew: castCrew.data.crew.slice(0, 6),
      },
    };
    console.log("theUltimateDetails", theUltimateDetails);
    dispatch(loadMovie(theUltimateDetails));
  } catch (error) {
    console.error("Error loading movie:", error);
  }
};
