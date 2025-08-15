import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.5/+esm";

const supabaseUrl = "https://nimxynqhngpeelredtpu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbXh5bnFobmdwZWVscmVkdHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjYwNDYsImV4cCI6MjA2OTA0MjA0Nn0.QyatEMQhc3Znkj0xEiVyx9DeLFzGQ3dbl5P_73mn1qg";
export const supabase = createClient(supabaseUrl, supabaseKey);
