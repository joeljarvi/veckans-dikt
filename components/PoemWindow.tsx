import { useEffect, useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { View } from "react-native";

import { PoemInfo } from "./PoemInfo";

import { PoemItem } from "./PoemItem";
import { supabase } from "../libs/supabaseClient";
import { useBackground } from "@/app/BackgroundContext";

export default function PoemWindow({ width }) {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { backgroundColor, setBackgroundColor } = useBackground();

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    const fetchPoems = async () => {
      const { data, error } = await supabase
        .from("veckans_dikt")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        setPoems(data);
      }

      setLoading(false);
    };

    fetchPoems();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View
      style={{
        width: width,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: backgroundColor,
      }}
    >
      <PoemInfo width={width} dikt={poems[currentIndex]} />

      <FlatList
        style={{ flex: 1, width: width }}
        horizontal
        pagingEnabled
        data={poems}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        keyboardShouldPersistTaps="handled"
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => <PoemItem width={width} item={item} />}
      />
    </View>
  );
}
