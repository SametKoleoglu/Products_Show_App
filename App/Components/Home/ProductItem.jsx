import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-1 m-3 p-3 rounded-lg border-[1px] border-slate-300 gap-2"
      onPress={() => navigation.push("ProductDetail", { product:item })}
    >
      <Image source={{ uri: item?.image }} className="w-full h-[140px]" />
      <View>
        <Text className="text-white bg-blue-200 text-center mt-1 p-1 rounded-full px-3 text-[10px] w-[80px]">
          {item.category}
        </Text>
        <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[15px] font-bold text-blue-300">
          ₺ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
