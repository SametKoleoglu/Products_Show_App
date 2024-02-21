import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { LatestItemList } from "../Components/Home";

export default function ExploreScreen() {
  const db = getFirestore(app);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setProductList([]);
    const q = query(
      collection(db, "UserProducts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      console.log(doc);
      setProductList((productList) => [...productList, doc.data()]);
    });
  };

  return (
    <ScrollView className="flex-1 p-3 py-8">
      <Text className="ml-3 font-semibold text-lg">ExploreScreen</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
}
