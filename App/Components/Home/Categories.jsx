import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Categories = ({ categoryList }) => {
  const navigation = useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center border-[1px] border-gray-300 m-3 h-[80px] rounded-lg bg-blue-100/40"
            onPress={() =>
              navigation.navigate("ItemList", { category: item.name })
            }
          >
            <Image source={{ uri: item?.icon }} className="w-[40px] h-[40px]" />
            <Text className="text-[12px] mt-2 ">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
