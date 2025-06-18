import { Text, ScrollView, StyleSheet } from "react-native";

export function PoemItem({ item, width }) {
  return (
    <ScrollView
      style={{
        height: "100%",
        width: width,
        flex: 1,
        paddingHorizontal: 32,
      }}
    >
      <Text style={styles.bodyText}>{item.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "TimesNewerRoman",
    color: "white",
    fontSize: 24,
    lineHeight: 86,
  },
  bodyText: {
    fontFamily: "TimesNewerRoman",
    color: "white",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 100,
    marginTop: 0,
  },
  container: {
    flex: 1,
    width: "100%",
  },
});
