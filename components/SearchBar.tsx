import { icons } from "@/assets/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({ placeholder, onPress }: { placeholder: string; onPress: () => void }) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        placeholderTextColor="#A8B5DB"
        className="ml-2 text-white flex-1"
      />
    </View>
  );
};

export default SearchBar;
