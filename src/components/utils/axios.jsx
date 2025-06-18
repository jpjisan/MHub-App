import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGY1OTUzYmRiNTI1YzFhYTQ4MDVjNzA0NjY4NzEwYyIsIm5iZiI6MTc0OTE5ODUwMi4wNzQsInN1YiI6IjY4NDJhNmE2ODg0ZjRhNjNiM2ZjYmQzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bni6fCdvfg15DaMlQKrjeGtXzcSweOI7w4UjY5k5wok",
  },
});

export default instance;
