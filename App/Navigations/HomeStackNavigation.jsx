import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, ItemList, ProductDetail } from "../Screens/Home";

const HomeStack = createStackNavigator();

export default function HomeStackNavigation() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "steelblue",
        },
        headerTintColor: "#fff",
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="ItemList"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
        })}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerTitle: "Detail" }}
      />
    </HomeStack.Navigator>
  );
}
