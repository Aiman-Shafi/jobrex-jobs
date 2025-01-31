import CreatedApplications from "@/components/CreatedApplications";
// import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "applicant"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "applicant" ? (
        <CreatedApplications />
      ) : (
        // <CreatedJobs />""
        ""
      )}
    </div>
  );
};

export default MyJobs;
