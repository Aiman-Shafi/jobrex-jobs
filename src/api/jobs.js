import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { company_id, searchTerm }) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").select("*, companies(name,logo_url)");
  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error loading data..", error);
    return null;
  }

  return data;
}

// Read single job
export async function getSingleJob(token, { id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}
