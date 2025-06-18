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

export default function Archive() {
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

  // Filter poems by selected author
  const poemsBySelectedAuthor = selectedAuthor
    ? poems.filter((p) => p.author === selectedAuthor)
    : [];

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
        <Text style={styles.vdHeading}>Arkiv</Text>
        <Link href="/">
          <Text style={styles.vdPforP}>V—D</Text>
        </Link>
      </View>

      <ScrollView
        style={{
          paddingTop: 16,
          paddingHorizontal: 32,
          paddingBottom: 96,
        }}
      >
        {/* Author list */}
        {Object.keys(groupedAuthors)
          .sort((a, b) => a.localeCompare(b, "sv"))
          .map((letter) => (
            <View key={letter} style={{ marginBottom: 0 }}>
              <Text style={styles.bigLetterText}>{letter}</Text>
              <View style={styles.dividerStyle}></View>
              {groupedAuthors[letter].map((author) => (
                <TouchableOpacity
                  key={author}
                  onPress={() => setSelectedAuthor(author)}
                >
                  <Text
                    style={{
                      fontFamily:
                        selectedAuthor === author
                          ? "TimesNewerRomanBold"
                          : "TimesNewerRoman",
                      fontSize: 14,
                      lineHeight: 32,
                      color:
                        selectedAuthor === author ? "rgb(0,255,0)" : "white",
                      textAlign: "right",
                      marginVertical: 4,
                    }}
                  >
                    {author}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

        {/* Poems by selected author */}
        {selectedAuthor && (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-start",

              paddingTop: 32,
            }}
          >
            {poemsBySelectedAuthor.length === 0 ? (
              <Text style={{ color: "white" }}>Inga dikter hittades.</Text>
            ) : (
              poemsBySelectedAuthor.map((poem) => (
                <View
                  key={poem.id}
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "TimesNewerRomanBold",
                          fontSize: 14,
                          lineHeight: 32,

                          color: "white",
                        }}
                      >
                        {poem.author}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "TimesNewerRomanItalic",
                          fontSize: 14,

                          color: "white",
                        }}
                      >
                        {poem.title || "Untitled"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setSelectedAuthor(null)}
                      style={styles.outlinedButtonBottom}
                    >
                      <Text style={styles.outlinedButtonText}>Stäng</Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      fontFamily: "TimesNewerRoman",
                      fontSize: 24,
                      lineHeight: 32,
                      color: "white",
                      marginTop: 64,
                    }}
                  >
                    {poem.body}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: 8,
  },

  authorText: {
    fontFamily: "TimesNewerRoman",
    fontSize: 16,
    lineHeight: 32,
    color: "white",
    textAlign: "right",
  },
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
    fontSize: 16,
    color: "white",
    textAlign: "left",
  },

  vdPforP: {
    width: 86,
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
