import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  //fileupload
  const randomId = Math.floor(Math.random() * 10000);
  const fileName = `resume-${jobData.name}-${randomId}`;

  const { error: uploadError } = await supabase.storage
    .from("resume")
    .upload(fileName, jobData.resume);

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/` + fileName;

  if (uploadError) throw new Error("Error Uploading Resume..", uploadError);

  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (error) {
    console.error("Error Apply to Job..", error);
    return null;
  }

  console.log("success", data);

  return data;
}

// update application status
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  const { data, error } = await query;

  if (error || data.length === 0) {
    console.error("Error updating application status..", error);
    return null;
  }

  return data;
}

// get single user applications
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  let { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name), location)")
    .eq("candidate_id", user_id);

  if (error || data.length === 0) {
    console.error("Error getting application data", error);
    return null;
  }

  return data;
}
