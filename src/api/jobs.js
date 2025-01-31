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

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error adding new job", error);
    return null;
  }

  return data;
}

// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// Delete job
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}
