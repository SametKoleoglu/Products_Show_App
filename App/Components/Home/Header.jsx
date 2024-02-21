import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user } = useUser();

  return (
    <View>
      {/* User info section */}

      <View className="flex flex-row items-center gap-3 mt-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[15px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="flex flex-row p-3 bg-white rounded-full px-5 mt-5 items-center border-blue-300 border-[1.5px]">
        <Ionicons name="search" size={23} color={"black"} />
        <TextInput
          placeholder="Search"
          className="ml-3 text-[15px] w-full"
          onChangeText={(text) => console.log(text)}
        />
      </View>
    </View>
  );
};

export default Header;
