import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostAddScreen } from "../Screens";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import HomeStackNavigation from "./HomeStackNavigation";
import ExploreStackNavigation from "./ExploreStackNavigation";
import ProfileStackNavigation from "./ProfileStackNavigation";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "steelblue" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "steelblue",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ExploreStack"
        component={ExploreStackNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PostAdd"
        component={PostAddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: "Add",
          headerTitle: "Add Product",
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
