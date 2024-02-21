import { StatusBar } from "expo-status-bar";
import LoginScreen from "./App/Screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Navigation from "./App/Navigations/Navigation";
import { View } from "react-native";

export default function App() {
  return (
    <ClerkProvider
      publishableKey=""
    >
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />

        <SignedIn>
          <Navigation />
        </SignedIn>

        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
