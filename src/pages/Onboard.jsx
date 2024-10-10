import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Comment } from "react-loader-spinner";
import { useNavigate } from "react-router";

export default function Onboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  console.log(user);

  const navigateUser = (currentRole) => {
    navigate(currentRole === "applicant" ? "/jobs" : "/post-job");
  };

  const handleUserRole = async (role) => {
    await user.update({ unsafeMetadata: { role } }).then(() => {
      console.log(`Role changed to ${role}`);
      navigateUser(role);
    });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
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
    <section className="flex flex-col items-center justify-center h-[600px]">
      <h2 className="text-3xl mb-10">Choose Your Role.. ✏️</h2>
      <div className="flex gap-4 ">
        <Button
          className="px-10 py-6 text-xl"
          onClick={() => handleUserRole("applicant")}
        >
          Applicant - I&#39;m looking for jobs
        </Button>
        <Button
          variant="primary"
          className="px-10 py-6 text-xl"
          onClick={() => handleUserRole("recruiter")}
        >
          Recruiter - I want to post a job
        </Button>
      </div>
    </section>
  );
}
