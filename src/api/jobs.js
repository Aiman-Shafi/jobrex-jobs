import supabaseClient from "@/utils/supabase";

// get all jobs
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

// get a single job

export async function getSingleJob(token, { id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, companies(name,logo_url), applications(*)")
    .eq("id", id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error loading single job data..", error);
    return null;
  }

  return data;
}

// check if job is open or closed

export async function updatedHiringStatus(token, { id }, isOpen) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").update({ isOpen }).eq("id", id).select();

  const { data, error } = await query;

  if (error) {
    console.error("Error udpdating job status..", error);
    return null;
  }

  return data;
}
