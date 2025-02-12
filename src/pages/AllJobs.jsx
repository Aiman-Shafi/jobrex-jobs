import { getJobs } from "@/api/jobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Comment } from "react-loader-spinner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobCard from "@/components/JobCard";
import { getCompany } from "@/api/company";
import { SelectGroup } from "@radix-ui/react-select";

export default function AllJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    data: jobs,
    loading: jobLoader,
    fetchData: fetchJobs,
  } = useFetch(getJobs, { searchTerm, company_id });

  const { data: companies, fetchData: fetchCompanies } = useFetch(getCompany);

  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [isLoaded, searchTerm, company_id]);

  useEffect(() => {
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-job");
    if (query) setSearchTerm(query);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCompany_id("");
  };

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
    <>
      <div className="min-h-screen">
        <header className="shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold ">Job Listings</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <div className="relative">
                  <form onSubmit={handleSearch}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10"
                      name="search-job"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={company_id}
                  onValueChange={(value) => setCompany_id(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map(({ name, id }) => {
                        return (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="destructive" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {jobLoader ? (
              <div className="text-gray-900">Loading...</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.length === 0 || null ? (
                  <div>No Job Found!</div>
                ) : (
                  jobs?.map((job) => <JobCard key={job.id} job={job} />)
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
