import BottomNav from "@/components/BottomNav";

import { useBackground } from "./BackgroundContext";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "../libs/supabaseClient";
import PoemWindow from "@/components/PoemWindow";
import { TouchableOpacity, ScrollView } from "react-native";

import { Dimensions, StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import { usePoems } from "./PoemContext";
import { Link } from "expo-router";

export default function About() {
  const { width } = Dimensions.get("window");
  const { poems } = usePoems();
  const { backgroundColor } = useBackground();

  const [selectedAuthor, setSelectedAuthor] = React.useState(null);

  const groupedAuthors = React.useMemo(() => {
    const groups = {};

    poems.forEach((poem) => {
      if (!poem.author) return;

      const nameParts = poem.author.trim().split(/\s+/);
      const lastName = nameParts[nameParts.length - 1];
      const firstLetter = lastName[0].toUpperCase();

      if (!groups[firstLetter]) {
        groups[firstLetter] = new Set();
      }

      groups[firstLetter].add(poem.author);
    });

    const sortedGroups = {};
    Object.keys(groups).forEach((letter) => {
      sortedGroups[letter] = Array.from(groups[letter]).sort((a, b) => {
        const aLast = a.split(/\s+/).slice(-1)[0];
        const bLast = b.split(/\s+/).slice(-1)[0];
        return aLast.localeCompare(bLast, "sv");
      });
    });

    return sortedGroups;
  }, [poems]);

  return (
    <View
      style={{
        position: "absolute",
        width: width,
        height: "100%",
        paddingTop: 96,
        flex: 1,
        backgroundColor: backgroundColor,
        zIndex: 20,
      }}
    >
      <View style={styles.vdHeader}>
        <Text style={styles.vdHeading}>Om V—D</Text>
        <Link href="/">
          <Text style={styles.vdPforP}>Veckans Dikt</Text>
        </Link>
      </View>

      <ScrollView
        style={{
          paddingTop: 16,
          paddingHorizontal: 32,
          paddingBottom: 96,
        }}
      >
        <View style={{ flex: 1, gap: 16, marginBottom: 16 }}>
          <Text style={styles.pText}>
            Veckans dikt är ett initiativ av Pennor för Palestina [P-för-P] för
            att väcka engagemang kring kriget i Gaza. Anslut dig till kampen
            idag.
          </Text>
          <Text style={styles.pText}>
            Skicka in ditt bidrag idag, klicka <Link href="/">här</Link> Tack
            till er som redan bidragit.
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  pText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },
  outlinedButtonText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  outlinedButtonBottom: {
    justifyContent: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-end",
  },

  bigLetterText: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 16,
    lineHeight: 32,
    color: "white",
  },

  authorText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 16,
    lineHeight: 32,
    color: "white",
    textAlign: "center",
  },

  vdHeader: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,

    gap: 16,
  },

  vdHeading: {
    fontFamily: "TimesNewerRomanBold",
    fontSize: 16,
    color: "white",
    textAlign: "left",
  },

  vdPforP: {
    width: 64,
    fontFamily: "TimesNewerRomanBold",
    fontSize: 16,
    color: "white",
    textAlign: "right",
  },
  dividerStyle: {
    height: 1,
    backgroundColor: "white",
    alignSelf: "stretch",
  },
});
