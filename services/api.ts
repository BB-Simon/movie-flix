const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  ACCESS_TOKEN: process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

// TMDB credentials:
// username: bb-simon
// password: 1234

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/discover/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    console.log("Response not ok:", response.statusText);
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
};

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODIyZWYxMjcwMzkxNDU4MTQ3ZWUwY2JmMWVhMjQ5YiIsIm5iZiI6MTc1ODA2MzY2MS43NDMsInN1YiI6IjY4YzllYzJkZTdkNGZiNDE2Y2M3ZjM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RQidrUboV4YJ1ZPZbKxfd7z6bt5PdGp979tVv1C0TAQ",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
