import { icons } from "@/assets/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, poster_path, path, title, vote_average, release_date, overview }: any) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-1/3">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placeholder.com/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center mt-1 gap-1">
          <Image source={icons.star} className="w-4 h-4" />
          <Text className="text-light-300 text-xs">{Math.round(vote_average / 2)}</Text>
        </View>
        <View className="flex-row items-center justify-between mt-1 gap-1">
          <Text className="text-light-300 text-xs font-medium">{release_date.split("-")[0]}</Text>
          <Text className="text-light-300 text-xs font-medium uppercase">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
