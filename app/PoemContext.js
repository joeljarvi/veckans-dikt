import React, { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "@/libs/supabaseClient";

const PoemContext = createContext();

export const PoemProvider = ({ children }) => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <PoemContext.Provider value={{ poems, loading }}>
      {children}
    </PoemContext.Provider>
  );
};

export const usePoems = () => useContext(PoemContext);
