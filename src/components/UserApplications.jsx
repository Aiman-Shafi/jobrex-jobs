import { getApplications } from "@/api/application";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Comment } from "react-loader-spinner";
import ApplicationCard from "./ApplicationCard";

// TODO: View Created Jobs from individual recruiters
export default function UserApplications() {
  const { user } = useUser();

  const {
    loading: loadingApplication,
    data: applications,
    fetchData: fetchApplication,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loadingApplication) {
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
    <>
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
            isMyApplicationPage={true}
          />
        ))}
      </div>
    </>
  );
}
