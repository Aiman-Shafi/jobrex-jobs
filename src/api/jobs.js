import supabase from "@/utils/supabase";

export async function getJobs() {
  let query = supabase.from("jobs").select("*");
  const { data, error } = await query;

  if (error) {
    console.error("Error loading data..", error);
    return null;
  }

  return data;
}
