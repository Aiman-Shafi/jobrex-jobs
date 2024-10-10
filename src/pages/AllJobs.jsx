import { getJobs } from "@/api/jobs";
import { useEffect } from "react";

export default function AllJobs() {
  // const fetchJobs = async () => {
  //   const data = await getJobs();
  //   console.log(data);
  // };

  useEffect(() => {
    getJobs();
  }, []);
  return <div>JOBS</div>;
}
