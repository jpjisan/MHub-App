export { removeTv } from "../reducers/tvSlice";
import axios from "../../components/utils/axios";
import { loadTv } from "../reducers/tvSlice";

export const asyncLoadTv = (tvId) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${tvId}`);
    const extrenalId = await axios.get(`/tv/${tvId}/external_ids`);
    const recommendations = await axios.get(`/tv/${tvId}/recommendations`);
    const similar = await axios.get(`/tv/${tvId}/similar`);
    const video = await axios.get(`/tv/${tvId}/videos`);
    const watchProvider = await axios.get(`/tv/${tvId}/watch/providers`);
    const castCrew = await axios.get(`/tv/${tvId}/credits`);

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
    dispatch(loadTv(theUltimateDetails));
  } catch (error) {
    console.error("Error loading/tv:", error);
  }
};
