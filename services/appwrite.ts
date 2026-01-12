import { Movie } from "@/assets/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const CLLECTION_ID = process.env.EXPO_PUBLIC_TABLE_METRICS_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

interface TrendingMovie {
  id: string;
  count: number;
  movie_id: string;
  movie_title: string;
  poster_url: string;
}

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, CLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    // console.log({ result });
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(DATABASE_ID, CLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, CLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        movie_id: movie.id,
        movie_title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
  // check if a record with search has already been stored
  // if a record found then increment the searchCout field
  // if no record found then create a new record
  //   create a new record in apprite database -> 1
};

export const gettrendingMovies = async (): Promise<TrendingMovie | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, CLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie;
  } catch (error) {
    console.log(error);
  }
};
