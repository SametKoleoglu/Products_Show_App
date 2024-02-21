import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { LatestItemList } from "../../Components/Home";
import { useNavigation } from "@react-navigation/native";

const MyProduct = () => {
  const db = getFirestore(app);
  const { user } = useUser();

  // states
  const [productList, setProductList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    user && getUserProduct();
  }, [user]);

  // useEffect(() => {
  //   navigation.addListener("focus", (e) => {
  //      getUserProduct();
  //   });
  // }, [navigation]);

  const getUserProduct = async () => {
    setProductList([]);
    const q = query(
      collection(db, "UserProducts"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <View className="flex-1 p-3">
      <LatestItemList latestItemList={productList} heading={"My Products"} />
    </View>
  );
};

export default MyProduct;
