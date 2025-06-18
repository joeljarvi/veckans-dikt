import { BackgroundProvider, useBackground } from "./BackgroundContext";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { PoemProvider } from "./PoemContext";

function LayoutContent() {
  const { backgroundColor } = useBackground();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar style="light" backgroundColor={backgroundColor} />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: backgroundColor }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Veckans Dikt" }} />
          <Stack.Screen name="archive" options={{ title: "Veckans Dikt" }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    TimesNewerRoman: require("../assets/fonts/TimesNewerRoman-Regular.otf"),
    TimesNewerRomanBold: require("../assets/fonts/TimesNewerRoman-Bold.otf"),
    TimesNewerRomanItalic: require("../assets/fonts/TimesNewerRoman-Italic.otf"),
    TimesNewerRomanBoldItalic: require("../assets/fonts/TimesNewerRoman-BoldItalic.otf"),
    SneakyTimes: require("../assets/fonts/Sneaky-Times.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <PoemProvider>
      <BackgroundProvider>
        <LayoutContent />
      </BackgroundProvider>
    </PoemProvider>
  );
}
