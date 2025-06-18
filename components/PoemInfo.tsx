// components/PoemInfo.js
import { View, Text, StyleSheet } from "react-native";

export function PoemInfo({ dikt, width }) {
  if (!dikt) return null;

  return (
    <View
      style={{
        width: width,
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
        paddingBottom: 32,
      }}
    >
      <Text style={styles.infoText}>
        V—D—{String(dikt.id).padStart(4, "0")}
      </Text>

      <View style={styles.dividerStyle}></View>

      <Text style={styles.infoText}>{dikt.author}</Text>

      <View style={styles.dividerStyle}></View>

      <Text style={styles.sneakyInfoText}>{dikt.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  infoText: {
    fontFamily: "TimesNewerRoman",
    color: "white",
    lineHeight: 32,
    fontSize: 14,
  },
  sneakyInfoText: {
    fontFamily: "TimesNewerRoman",
    color: "white",
    lineHeight: 32,
    fontSize: 14,
  },
  dividerStyle: {
    height: 1,
    backgroundColor: "white",
    alignSelf: "stretch",
  },
});
