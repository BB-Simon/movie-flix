import { images } from "@/assets/constants/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  // const movie = movies && movies.length > 0 ? movies[0] : {};

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        if (movies && movies.length > 0 && movies[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  console.log({ searchQuery });
  return (
    <View className="flex-1 bg-primary">
      <View className="flex-1">
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          // horizontal
          // showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <MovieCard {...item} />;
          }}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 16,
            marginVertical: 16,
          }}
          // className="mt-5 mb-32"
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 16,
          }}
          // scrollEnabled={false}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row items-center justify-center mt-20">
                <Image
                  style={{ width: 48, height: 40 }}
                  source={images.logo}
                  className="w-12 h-12"
                />
              </View>
              <View className="my-5">
                <SearchBar
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
              </View>
              {moviesLoading && (
                <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
              )}
              {moviesError && <Text className="text-red-500">Error: {moviesError.message}</Text>}
              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search results for <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            <>
              {!moviesLoading && !moviesError && (
                <View className="mt-5 px-5">
                  <Text className="text-white text-center">
                    {searchQuery.trim() ? "No movies found" : "Search for a movie"}
                  </Text>
                </View>
              )}
            </>
          }
        />
      </View>
    </View>
  );
};

export default Search;
