import { View, Text, FlatList } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";

const LatestItemList = ({ latestItemList, heading }) => {
  return (
    <View className="flex-1 mt-2 mb-10">
      <Text className="font-bold text-lg ml-3">{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => <ProductItem item={item} />}
      />
    </View>
  );
};

export default LatestItemList;
