import CreatedJobs from "@/components/CreatedJobs";
import UserApplications from "@/components/UserApplications";
import { useUser } from "@clerk/clerk-react";
import { Comment } from "react-loader-spinner";

export default function MyJobs() {
  const { user, isLoaded } = useUser();

  console.log("isLoaded:", isLoaded);
  console.log("User:", user);
  console.log("Metadata:", user?.unsafeMetadata);

  if (!isLoaded || !user) {
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
      <header className="border-b border-gray-200 bg-gray-50 dark:bg-transparent dark:border-gray-700 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl">
                {user?.unsafeMetadata?.role === "recruiter"
                  ? "My Jobs"
                  : "My Applications"}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                {user?.unsafeMetadata?.role === "recruiter"
                  ? "View all the jobs you have created 😁"
                  : "Check all the applications you have applied so far 😁"}
              </p>
            </div>
          </div>
        </div>
      </header>
      {user?.unsafeMetadata?.role === "recruiter" ? (
        <CreatedJobs />
      ) : (
        <UserApplications />
      )}
    </>
  );
}
