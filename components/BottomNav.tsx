import { useState } from "react";
import { useBackground } from "../app/BackgroundContext";

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { supabase } from "@/libs/supabaseClient";

export default function BottomNav() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [email, setEmail] = useState("");

  const { backgroundColor, setBackgroundColor } = useBackground();

  const isGreenAndDrawerOpen = showDrawer && backgroundColor === "rgb(0,255,0)";
  const buttonStyle = isGreenAndDrawerOpen
    ? styles.blackButton
    : styles.outlinedButton;
  const textStyle = isGreenAndDrawerOpen
    ? styles.blackButtonText
    : styles.outlinedButtonText;

  function handleCloseDrawer() {
    setShowDrawer(false);
    setBackgroundColor("rgb(0,0,0)");
  }

  function toggleDrawer() {
    setShowDrawer((prev) => {
      const nextState = !prev;
      setBackgroundColor(nextState ? "rgb(0,255,0)" : "rgb(0,0,0)");
      return nextState;
    });
  }

  async function handleSubscribe() {
    if (!email.includes("@")) {
      alert("Vänligen ange en giltig e-postadress.");
      return;
    }

    Keyboard.dismiss(); // Close the keyboard

    const { data, error } = await supabase
      .from("newsletter")
      .insert([{ email }]);

    if (error) {
      console.error(error);
      alert("Något gick fel. Försök igen.");
    } else {
      alert("Tack för din prenumeration!");
      setEmail("");
    }
  }

  return (
    <>
      <View
        style={{
          position: "absolute",

          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 32,
          paddingBottom: 16,
          gap: 32,
          zIndex: 20,
          backgroundColor: backgroundColor,
        }}
      >
        <TouchableOpacity style={buttonStyle}>
          <Text style={textStyle}>Support Gaza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttonStyle} onPress={toggleDrawer}>
          <Text style={textStyle}> {showDrawer ? "Stäng" : "Meny"}</Text>
        </TouchableOpacity>
      </View>

      {showDrawer && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={styles.drawerStyle}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={64} // adjust based on any header height
          >
            <ScrollView
              contentContainerStyle={styles.drawerContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.drawerHeader}>
                <Link href="/" onPress={handleCloseDrawer}>
                  <Text style={styles.drawerHeading}>Veckans Dikt</Text>
                </Link>
                <Text style={styles.drawerPforP}>Pennor—för—Palestina</Text>
              </View>
              <View style={styles.drawerMenu}>
                <Link href="/archive" onPress={handleCloseDrawer}>
                  <Text style={styles.menuItem}>Arkiv</Text>
                </Link>
                <Link href="/about" onPress={handleCloseDrawer}>
                  <Text style={styles.menuItem}>Om V—D</Text>
                </Link>
                <Text style={styles.menuItem}>Support Gaza</Text>
              </View>
              <View style={{ gap: 32 }}>
                <View style={styles.newsletterBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TouchableOpacity
                    style={styles.newsletterButton}
                    onPress={handleSubscribe}
                  >
                    <Text style={styles.newsletterButtonText}>Prenumerera</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.pText}>
                  Veckans dikt är ett initiativ av Pennor för Palestina
                  [P-för-P] för att väcka engagemang kring kriget i Gaza. Anslut
                  dig till kampen idag. Följ vårt nyhetsbrev, eller ännu bättre:
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },

  pTextItalic: {
    fontFamily: "TimesNewerRomanItalic",
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },

  pTextBold: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },

  input: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    fontFamily: "TimesNewerRoman",
  },

  newsletterButton: {
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "black",
  },

  newsletterButtonText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },

  newsletterBox: {
    flexDirection: "row",
    gap: 32,
  },
  menuItem: {
    fontFamily: "TimesNewerRoman",
    fontSize: 24,

    color: "black",
    textAlign: "left",
  },

  drawerMenu: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "auto",
    paddingTop: 16,
  },

  drawerStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(0, 255, 0)",
    zIndex: 20,
  },

  drawerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",

    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 0,
  },

  drawerHeader: {
    width: "100%",
    height: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    gap: 16,
  },

  drawerHeading: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },

  drawerPforP: {
    width: 86,
    fontFamily: "TimesNewerRomanBold",
    fontSize: 14,
    color: "black",
    textAlign: "right",
  },

  menuButtonStyle: {
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "white",
  },

  outlinedButton: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "white",
  },

  blackButton: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "black",
  },

  supportButton: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "rgb(255,0,0)",
    backgroundColor: "rgb(255,0,0)",
  },

  outlinedButtonText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },

  blackButtonText: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 12,
    color: "rgb(0,255,0)",
    textAlign: "center",
  },
});
