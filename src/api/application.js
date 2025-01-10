import supabaseClient from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("applications")
    .insert([...jobData])
    .select();

  const { data, error } = await query;

  if (error) {
    console.error("Error Apply to Job..", error);
    return null;
  }

  console.log("success", data);

  return data;
}
