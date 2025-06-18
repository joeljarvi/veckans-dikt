import BottomNav from "@/components/BottomNav";
import PoemWindow from "@/components/PoemWindow";
import { useBackground } from "./BackgroundContext";

import { Dimensions, StyleSheet, View, Text } from "react-native";
import React from "react";

export default function HomeScreen() {
  const { width } = Dimensions.get("window");
  const { backgroundColor, setBackgroundColor } = useBackground();
  return (
    <View
      style={{
        width: width,
        paddingTop: 96,
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.vdHeader}>
        <Text style={styles.vdHeading}>Veckans Dikt</Text>

        <Text style={styles.vdPforP}>Pennor—för—Palestina</Text>
      </View>
      <PoemWindow width={width} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  vdHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingLeft: 32,
    paddingRight: 32,
    zIndex: 20,
  },

  vdHeading: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },

  vdPforP: {
    width: 86,
    fontFamily: "TimesNewerRomanBold",
    fontSize: 14,
    color: "white",
    textAlign: "right",
  },
});
