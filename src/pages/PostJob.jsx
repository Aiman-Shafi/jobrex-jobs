import { addNewJob } from "@/api/jobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCompany } from "@/api/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

//TODO: Markdown editor implementation
export default function PostJob() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { company_id: "" } });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fetchData: fetchCreateJob,
  } = useFetch(addNewJob);

  const { data: companies, fetchData: fetchCompanies } = useFetch(getCompany);

  useEffect(() => {
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);

  const onSubmit = (data) => {
    console.log(data);
    fetchCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
    reset();
    toast.success("Congrats, New Job Added");
  };

  useEffect(() => {
    if (dataCreateJob.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return navigate("/jobs");
  }

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mt-10">Post a Job</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title" className="mb-2 inline-block text-lg">
            Job Title
          </Label>
          <Input
            id="title"
            placeholder="e.g Backend Engineer"
            className="col-span-3"
            type="text"
            {...register("title", { required: true })}
          />
          {errors?.title?.type == "required" && (
            <p className="text-red-500 py-2">This field is required</p>
          )}

          <Label
            htmlFor="description"
            className="my-2 mt-4 inline-block text-lg"
          >
            Job Description
          </Label>
          <Textarea
            id="description"
            placeholder="e.g Backend Engineer"
            className="col-span-3"
            // type="text"
            {...register("description", { required: true })}
          />

          {errors?.description?.type == "required" && (
            <p className="text-red-500 py-2">This field is required</p>
          )}

          <Label htmlFor="salary" className="my-2 mt-4 inline-block text-lg">
            Salary
          </Label>
          <Input
            id="salary"
            placeholder="e.g $5000-10,0000 per month"
            className="col-span-3"
            type="text"
            {...register("salary", { required: true })}
          />
          {errors?.salary?.type == "required" && (
            <p className="text-red-500 py-2">This field is required</p>
          )}

          <Label htmlFor="location" className="my-2 mt-4 inline-block text-lg">
            Location
          </Label>
          <Input
            id="location"
            placeholder="e.g Dhaka, Bangladesh"
            className="col-span-3"
            type="text"
            {...register("location", { required: true })}
          />
          {errors?.location?.type == "required" && (
            <p className="text-red-500 py-2">This field is required</p>
          )}

          <Label
            htmlFor="company_id"
            className="my-2 mt-4 inline-block text-lg"
          >
            Choose Company
          </Label>
          <Controller
            control={control}
            name="company_id"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Company">
                    {field.value
                      ? companies.find(
                          (company) => company.id === Number(field.value)
                        ).name
                      : "Choose Company"}
                  </SelectValue>
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
            )}
          />

          {errorCreateJob?.message && (
            <div className="text-red-600">{errorCreateJob?.message}</div>
          )}

          <Button type="submit" className="w-full mt-4">
            {loadingCreateJob ? "Posting New Job...." : "Post a Job"}
          </Button>
        </form>
      </div>
    </>
  );
}
