import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

{
  /*  */
}

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      image: "basket-check-outline",
      name: "My Products",
      path: "MyProduct",
    },
    {
      id: 2,
      image: "database-eye-outline",
      name: "Explorers",
      path: "Explore",
    },
    { id: 3, image: "account-edit-outline", name: "Profile Edit", path: "" },
    { id: 4, image: "logout", name: "Logout", path: "" },
  ];

  const onMenuPress = (item) => {
    if (item.name === "Logout") {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };

  return (
    <View className="flex-1 p-4">
      <View className="items-center text-center">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full "
        />
        <Text className="font-semibold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="font-thin text-[20px] mt-2">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <FlatList
        data={menuList}
        key={(item) => item.id}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className="flex-1 p-4 border-[1px] items-center mx-1 mt-10 rounded-full justify-center"
            style={{ backgroundColor: "steelblue" }}
          >
            {item.image && (
              <MaterialCommunityIcons
                name={item?.image}
                size={40}
                color="#fff"
              />
            )}
            <Text className="text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
