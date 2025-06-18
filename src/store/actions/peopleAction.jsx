export { removePerson } from "../reducers/personSlice";
import axios from "../../components/utils/axios";
import { loadPerson } from "../reducers/personSlice";

export const asyncLoadPerson = (personId) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${personId}`);
    const extrenalId = await axios.get(`/person/${personId}/external_ids`);
    const combinedCredits = await axios.get(
      `/person/${personId}/combined_credits`
    );
    const tvCredits = await axios.get(`/person/${personId}/tv_credits`);
    const movieCredits = await axios.get(`/person/${personId}/movie_credits`);

    let theUltimateDetails = {
      details: details.data,
      extrenalId: extrenalId.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    console.log("theUltimateDetails", theUltimateDetails);
    dispatch(loadPerson(theUltimateDetails));
  } catch (error) {
    console.error("Error loading/person:", error);
  }
};
