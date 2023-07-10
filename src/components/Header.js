import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Header = ({ title, navigation }) => {
  return (
    <View className="flex-row items-center justify-center py-2">
      <TouchableOpacity
        className="absolute left-5"
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white/95 font-inter-500 text-lg">{title}</Text>
    </View>
  );
};

export default Header;
