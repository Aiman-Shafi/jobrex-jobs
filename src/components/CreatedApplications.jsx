import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./ApplicationCard";
import { useEffect } from "react";
import { getApplications } from "@/api/application";
import useFetch from "@/hooks/useFetch";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fetchData: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;
