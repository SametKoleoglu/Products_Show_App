import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Categories,
  Header,
  LatestItemList,
  Slider,
} from "../../Components/Home";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    setCategoryList();
    getCategoryList();
    getLatestItemList();
  }, []);
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserProducts"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white p-3"
    >
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Latest Items"}
      />
    </ScrollView>
  );
}
