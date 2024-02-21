import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { LatestItemList } from "../../Components/Home";

const ItemList = () => {
  const { params } = useRoute();
  const db = getFirestore(app);

  // states
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserProducts"),
      where("category", "==", params.category)
    );

    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <View className="p-2 flex-1">
      {loading ? (
        <ActivityIndicator className="mt-24" size={"large"} color={"steelblue"} />
      ) : itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading={"Latest Products"} />
      ) : (
        <Text className="p-5 text-[20px] mt-24 justify-center text-center">
          No Products Found
        </Text>
      )}
    </View>
  );
};

export default ItemList;
