import { supabase } from "../lib/supabaseClient";

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// signOut()`에는 data 속성이 없음
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
