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
import { MapPin } from "lucide-react";

export default function ApplicationCard({
  application,
  isCandidate,
  isMyApplicationPage = false,
}) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };
  const { fetchData: updateStatus } = useFetch(updateApplicationStatus, {
    job_id: application.job_id,
  });

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

      <div className="flex flex-1 justify-between items-center">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          {isMyApplicationPage && (
            <div className="bg-gray-900 rounded-md p-4 mb-4">
              <h2 className="text-3xl text-bold">{application.job.title}</h2>
              <div className="flex gap-1 items-center mt-2">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-gray-400">
                  {application.job.location}
                </span>
                <span className="bg-purple-600/30 p-1 rounded-md ml-4">
                  {application.job.company.name}
                </span>
              </div>
            </div>
          )}
          <h3 className="font-bold text-gray-900 dark:text-white">
            Name: {application.name}
          </h3>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Education: <span>{application.education}</span>
          </h3>
          <h3 className="font-bold text-gray-900 dark:text-white">
            Skill: <span>{application.skills}</span>
          </h3>
          <Button className="my-4" onClick={handleDownload}>
            Download Resume
          </Button>
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
