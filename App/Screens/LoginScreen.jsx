import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
WebBrowser.maybeCompleteAuthSession();
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

export default function LoginScreen({ navigation }) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/illustration-flat-antique-market-with-different-objects_23-2148899917.jpg?w=1060&t=st=1708343554~exp=1708344154~hmac=c962fde20e4417e064bedcad44e656819609dd9052c6b9d098f50851e6f79c48",
        }}
        className="w-full h-[330px] object-cover"
      />
      <View className="p-8 rounded-t-2xl bg-white mt-[-15px] ">
        <Text className="text-[30px] font-extralight">Product Show App</Text>
        <Text className="text-slate-500 mt-5 text-[20px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dolor
          tempora.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-5 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[15px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
