import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function PostAddScreen() {
  const db = getFirestore(app);
  const storage = getStorage();

  const { user } = useUser();

  // states
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  // ! used to get categoryList
  const getCategoryList = async () => {
    setCategoryList([]);

    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      console.log("Docs : ", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  // ! Used to Pick Image from Gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ! on submit

  const onSubmitMethod = async (value) => {
    setLoading(true);

    // Convert uri to blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "communityProducts/" + Date.now() + "jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file ");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;

          const docRef = await addDoc(collection(db, "UserProducts"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success", "Product Added Successfully");
          }
        });
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-3">
        <Text className="text-2xl font-medium mt-4">Add New Product</Text>
        <Text className="text-xl font-extralight mb-5">
          Create New Product & Start Selling
        </Text>
        <Formik
          initialValues={{
            name: "",
            desc: "",
            category: "",
            address: "",
            price: "",
            image: "",
            userName: "",
            userEmail: "",
            userImage: "",
            createdAt: Date.now(),
          }}
          onSubmit={(value) => onSubmitMethod(value)}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              console.log("Title not Present");
              ToastAndroid.show("Title must be there", ToastAndroid.SHORT);
              errors.name = "Title must be there ";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TouchableOpacity className="mb-2" onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/image-gallery.png")}
                    style={{ width: 80, height: 80 }}
                  />
                )}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                onChangeText={handleChange("desc")}
                numberOfLines={8}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              {/* category list dropdown */}
              <View>
                <Picker
                  style={[
                    {
                      backgroundColor: "steelblue",
                      borderRadius: 20,
                      color: "#fff",
                    },
                  ]}
                  selectedValue={values?.category}
                  onValueChange={(category) =>
                    setFieldValue("category", category)
                  }
                >
                  {categoryList.length > 0 &&
                    categoryList.map(
                      (category, index) =>
                        category && (
                          <Picker.Item
                            color={Platform.OS == "ios" && "white"}
                            key={index}
                            label={category?.name}
                            value={category?.name}
                          />
                        )
                    )}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="mt-5 items-center self-center border-2 w-1/2 rounded-2xl h-10 bg-blue-500 justify-center border-transparent"
                style={Platform.OS == "ios" && { marginBottom: 20 }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={"red"} />
                ) : (
                  <Text className="text-white font-bold">Add</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    fontSize: 15,
    textAlignVertical: "top",
  },
});
