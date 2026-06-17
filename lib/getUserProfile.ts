import { supabase } from "./supabase";

export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("prenom, entreprise, email")
    .eq("id", user.id)
    .single();

  return profile;
}