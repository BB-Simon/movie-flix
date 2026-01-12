import { images } from "@/assets/constants/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import { gettrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => gettrendingMovies());

  console.log({ trendingMovies });

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        className="flex-1 px-5"
      >
        <Image
          source={images.logo}
          style={{ width: 48, height: 40 }}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError || trendingMoviesError ? (
          <Text className="text-red-500">Failed to load movies</Text>
        ) : (
          <View className="flex-1">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie, tv show, person......"
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-white text-lg font-semibold mt-5 mb-3">Trending Movies</Text>
              </View>
            )}

            <Text className="text-white text-lg font-semibold mt-5 mb-3">Latest Movies</Text>
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
                gap: 20,
                marginBottom: 10,
                paddingRight: 5,
              }}
              className="mt-5 mb-32"
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
