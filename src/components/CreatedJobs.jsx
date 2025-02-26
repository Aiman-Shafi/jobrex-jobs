import { getMyJobs } from "@/api/jobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { Comment } from "react-loader-spinner";
import { useEffect } from "react";
import JobCard from "./JobCard";

export default function CreatedJobs() {
  const { user } = useUser();
  const {
    data: jobs,
    loading: myJobLoader,
    fetchData: fetchMyJobs,
  } = useFetch(getMyJobs, { recruiter_id: user.id });

  useEffect(() => {
    fetchMyJobs();
    console.log(jobs);
  }, []);

  if (myJobLoader) {
    return (
      <div className="absolute inset-0 top-0 left-0 flex items-center justify-center">
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#612895"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.length === 0 || null ? (
        <div>No Job Found!</div>
      ) : (
        jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isMyJob={true}
            onJobAction={fetchMyJobs}
          />
        ))
      )}
    </div>
  );
}
