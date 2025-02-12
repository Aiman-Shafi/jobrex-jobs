import supabaseClient from "@/utils/supabase";

export async function getCompany(token) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("companies").select("*");

  const { data, error } = await query;

  if (error) {
    console.error("Error loading data..", error);
    return null;
  }

  return data;
}
