import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://iigdhozrssmfbhebplcg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ2Rob3pyc3NtZmJoZWJwbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NDcyMTIsImV4cCI6MjA5ODQyMzIxMn0.P1Us-4575gHHVKDs-GyDSOTaTxL4PveF5-eMmDfZXSY";

export const supabase = createClient(supabaseUrl, supabaseKey);