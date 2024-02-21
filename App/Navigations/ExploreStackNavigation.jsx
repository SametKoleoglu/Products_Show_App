import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductDetail } from "../Screens/Home";
import { ExploreScreen } from "../Screens";

const Stack = createStackNavigator();

const ExploreStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "steelblue" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerTitle: "Explore" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerTitle: "Detail" }}
      />
    </Stack.Navigator>
  );
};

export default ExploreStackNavigation;
