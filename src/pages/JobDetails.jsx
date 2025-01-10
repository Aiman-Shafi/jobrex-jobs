import { getSingleJob, updatedHiringStatus } from "@/api/jobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router";
import { Comment } from "react-loader-spinner";
import { useEffect } from "react";
import {
  CircleDollarSign,
  DoorClosed,
  DoorOpen,
  ScrollText,
  UserPen,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/ApplyJobDrawer";
import ApplicationCard from "@/components/ApplicationCard";

export default function JobDetails() {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  //fetch single job data
  const {
    data: job,
    loading: jobLoader,
    fetchData: fetchSingleJob,
  } = useFetch(getSingleJob, { id: id });

  useEffect(() => {
    if (isLoaded) {
      fetchSingleJob();
    }
  }, [isLoaded]);

  const { loading: hiringStatusLoader, fetchData: fetchHiringStatus } =
    useFetch(updatedHiringStatus, { id: id });

  const handleStatusChange = (value) => {
    const isOpen = value == "open";
    fetchHiringStatus(isOpen).then(() => fetchSingleJob());
  };

  if (!isLoaded || jobLoader) {
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
    <section className="max-w-6xl mx-auto mt-10">
      <div className="border rounded-lg border-gray-600 bg-gray-50 dark:bg-transparent">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                {job?.title}
              </h1>

              <p className="mt-1.5 text-sm text-gray-400">{job?.location}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* <button
                  className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  Create Post
                </button> */}
              <img
                src={job?.companies?.logo_url}
                alt={job?.title}
                className="w-[140px] rounded-lg h-[60px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flow-root rounded-lg border border-gray-100 dark:border-gray-600 py-3 shadow-sm mt-10">
        <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-600 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-gray-700/30 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
              <CircleDollarSign className="text-purple-500" />{" "}
              <span className="text-lg">Salary</span>
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2 text-lg ">
              {job?.salary}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-gray-700/30 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
              <ScrollText className="text-purple-500" />{" "}
              <span className="text-lg">Description</span>
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2 text-lg ">
              {job?.description}
            </dd>
          </div>

          {/* Applicants */}
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-gray-700/30 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
              <UserPen className="text-purple-500" />{" "}
              <span className="text-lg">Applicants</span>
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2 text-lg ">
              {job?.applications?.length}
            </dd>
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-gray-700/30 sm:grid-cols-3 sm:gap-4">
            <dt className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-3">
              {job?.isOpen ? (
                <>
                  <DoorOpen className="text-green-500" />{" "}
                </>
              ) : (
                <>
                  <DoorClosed className="text-red-500" />{" "}
                </>
              )}
              <span className="text-lg">Status</span>
            </dt>
            <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2 text-lg ">
              {job?.isOpen ? (
                <>
                  <span className="text-lg">Apply Now</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Job Closed</span>
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {job?.recruiter_id == user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-[180px] ${
              job.isOpen ? "bg-green-900" : "bg-red-900"
            }`}
          >
            <SelectValue
              placeholder={job.isOpen ? "Status Open" : "Status Closed"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fetchSingleJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {hiringStatusLoader && <div>loading..</div>}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </section>
  );
}
