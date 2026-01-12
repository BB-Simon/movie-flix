export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

// export interface MovieDetails extends Movie {
//   backdrop_path: string;
//   budget: number;
//   homepage: string;
//   imdb_id: string;
// }
