import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MyProduct, ProfileScreen } from "../Screens/Profile";
import { ProductDetail } from "../Screens/Home";

const Stack = createStackNavigator();

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "steelblue" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="MyProduct"
        component={MyProduct}
        options={{ headerTitle: "My Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerTitle: "Detail" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigation;
