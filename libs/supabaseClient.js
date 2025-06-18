import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const config = Constants.expoConfig?.extra;

if (!config) {
  throw new Error("Missing config: 'extra' is not available.");
}

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);
