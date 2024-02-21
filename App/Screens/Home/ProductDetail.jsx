import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const ProductDetail = ({ navigation }) => {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();

  useEffect(() => {
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={23}
          color={"#fff"}
          style={{ marginRight: 10 }}
          onPress={() => shareProduct()}
        />
      ),
    });
  };

  // used to share product
  const shareProduct = () => {
    const content = {
      message: product?.title + "\n" + product.desc,
    };
    Share.share(content).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendEmailMessage = () => {
    const subject = `Regarding : ${product?.title}`;
    const body =
      "Hi" +
      product?.userName +
      "\n" +
      "I am interested in this product. Please contact me";
    Linking.openURL(
      `mailto:${product.userEmail}?subject=${subject}&body=${body}`
    );
  };

  const deleteUserProduct = () => {
    Alert.alert(
      "Do u want to delete this product?",
      "Are u want to delete this product?",
      [
        {
          text: "Yes",
          onPress: () => deleteFromFirestore(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  const deleteFromFirestore = async () => {
    console.log(product.title);
    const q = query(
      collection(db, "UserProducts"),
      where('title', '==', product.title)
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((res) => {
        nav.goBack();
      });
    });
  };

  return (
    <ScrollView className="flex-1">
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />

      <View className="m-5 ">
        <Text className="text-[22px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1.5 px-2 mt-2 rounded-full bg-blue-300 text-white">
            {product?.category}
          </Text>
        </View>
        <Text className="mt-3 text-[20px] font-bold">Description</Text>
        <Text className="text-[15px] text-black">{product?.desc}</Text>
      </View>

      {/* user info */}
      <View className="p-3  flex flex-row items-center gap-3 border-blue-400">
        <Image
          source={{ uri: product?.userImage }}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="font-bold text-[17px]">{product?.userName}</Text>
          <Text>{product?.userEmail}</Text>
        </View>
      </View>

      {user?.primaryEmailAddress?.emailAddress === product?.userEmail ? (
        <TouchableOpacity
          onPress={() => deleteUserProduct()}
          className="z-40 bg-red-500 rounded-full m-2 p-3"
        >
          <Text className="text-center text-white">Delete Product</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="z-40 bg-blue-500 rounded-full m-2 p-3"
        >
          <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProductDetail;
