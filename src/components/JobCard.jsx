import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { deleteJob } from "@/api/jobs";

export default function JobCard({
  job,
  isMyJob = false,
  onJobAction = () => {},
}) {
  const { loading: deleteJobLoader, fetchData: deleteMyJob } = useFetch(
    deleteJob,
    { job_id: job.id }
  );

  const handleDeleteJob = async () => {
    await deleteMyJob();
    onJobAction();
  };
  return (
    <Card key={job.id} className="relative">
      {isMyJob && (
        <Button
          onClick={handleDeleteJob}
          variant="destructive"
          className="absolute top-2 right-2"
        >
          {deleteJobLoader ? "Deleting..." : "Delete"}
        </Button>
      )}
      <CardHeader>
        <Link to={`/job/${job.id}`}>
          <img
            src={job.companies.logo_url}
            className="h-9 w-24 object-cover rounded-md mb-4"
          />
        </Link>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-600 flex items-center mt-2">
          <MapPin className="w-4 h-4 mr-1" />
          {job.location}
        </p>
        <p className="text-sm font-semibold mt-2">{job.salary}</p>
        <Button className="w-full mt-4 ">
          <Link to={`/job/${job.id}`}>Apply Now</Link>
          {/* Apply Now */}
        </Button>
      </CardContent>
    </Card>
  );
}
