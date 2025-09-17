import { images } from "@/assets/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.logo}
        style={{ width: 48, height: 40 }}
        className="w-12 h-10 mt-20 mb-5 mx-auto"
      />

      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError ? (
        <Text className="text-red-500">Failed to load movies</Text>
      ) : (
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
            className="mt-5 mb-32"
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default Search;
