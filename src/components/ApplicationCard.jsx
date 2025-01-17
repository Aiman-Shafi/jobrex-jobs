import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { updateApplicationStatus } from "@/api/application";
import toast from "react-hot-toast";

export default function ApplicationCard({ application, isCandidate }) {
  // TODO: Handle Download Resume

  const { loading: statusLoader, fetchData: updateStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    updateStatus(status).then(() => {
      updateStatus();
      toast.success("Status Updated");
    });
  };
  return (
    <article className="flex bg-white dark:bg-gray-800 transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-gray-300">
          <span>{new Date(application.created_at).toLocaleTimeString()}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{new Date(application.created_at).toLocaleDateString()}</span>
        </time>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white">
            Name: {application.name}
          </h3>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Education: <span>{application.education}</span>
          </h3>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Skill: <span>{application.skills}</span>
          </h3>
          <Button className="my-4">Download Resume</Button>
        </div>

        {isCandidate ? (
          <>
            <div className="sm:flex sm:items-end sm:justify-end m-2">
              <span className="bg-purple-900 rounded-lg text-white p-2">
                {application.status}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="sm:flex sm:items-end sm:justify-end m-2">
              <Select
                onValueChange={handleStatusChange}
                defaultValue={application.status}
              >
                <SelectTrigger className="w-[180px] bg-violet-900">
                  <SelectValue placeholder="Application Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
