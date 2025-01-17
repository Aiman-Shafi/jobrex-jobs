import { applyToJob } from "@/api/application";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/useFetch";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// TODO: fetch Job & POST REQ: Apply to Job
// TODO: Send resume to supabase storage
// TODO: zod validation (optional)

export function ApplyJobDialog({ job, applied, user, fetchJob }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    // loading: loadingApplytoJob,
    // error: errorApplytoJob,
    fetchData: applyJob,
  } = useFetch(applyToJob);
  const onSubmit = (data) => {
    applyJob({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "Applied",
    }).then(() => {
      fetchJob();
      reset();
      toast.success("Successfully created!");
    });
  };

  return (
    <Dialog>
      {applied ? (
        <Button variant="destructive">Applied</Button>
      ) : (
        <DialogTrigger asChild>
          <Button className="my-3">Apply Now</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="text-center">
          <DialogTitle>{job?.title}</DialogTitle>
          <DialogDescription>{job?.companies?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 justify-start py-4">
          {/* <div className=" gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" placeholder="John Doe" className="col-span-3" />
          </div> */}
          <div className="gap-4">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              placeholder="3"
              className="col-span-3"
              type="number"
              {...register("experience", { required: true })}
            />
            {errors?.experience?.type == "required" && (
              <p className="text-red-500 py-2">This field is required</p>
            )}
          </div>
          <div className=" gap-4">
            <Label htmlFor="skills" className="text-left">
              Skills
            </Label>
            <Input
              id="skills"
              placeholder="ReactJs,NextJS,Laravel"
              className="col-span-3"
              {...register("skills", { required: true })}
            />
            {errors?.experience?.type == "required" && (
              <p className="text-red-500 py-2">This field is required</p>
            )}
          </div>
          <div className="items-start gap-4">
            <Label htmlFor="education" className="text-left">
              Education Qualification
            </Label>
            <RadioGroup
              defaultValue="Graduate"
              {...register("education", { required: true })}
            >
              <div className="flex  space-x-2">
                <RadioGroupItem value="Graduate" id="r1" />
                <Label htmlFor="r1">Graduate</Label>
              </div>
              <div className="flex  space-x-2">
                <RadioGroupItem value="Undergraduate" id="r2" />
                <Label htmlFor="r2">Undergraduate</Label>
              </div>
              <div className="flex  space-x-2">
                <RadioGroupItem value="Msc / MBA" id="r3" />
                <Label htmlFor="r3">Msc / MBA </Label>
              </div>
              <div className="flex  space-x-2">
                <RadioGroupItem value="Others" id="r4" />
                <Label htmlFor="r4">Others</Label>
              </div>
            </RadioGroup>
            {errors?.experience?.type == "required" && (
              <p className="text-red-500 py-2">This field is required</p>
            )}
          </div>
          <div className="flex flex-col gap-4 py-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 ">
              <FileIcon className="w-12 h-12" />
              <span className="text-sm font-medium text-gray-500">
                Drag and drop a file or click to browse
              </span>
              <span className="text-xs text-gray-500">PDF / Docs</span>
            </div>
            <div className="space-y-2 text-sm">
              <Label htmlFor="resume" className="text-sm font-medium">
                Upload Resume
              </Label>
              <Input
                id="resume"
                type="file"
                placeholder="Resume"
                accept=".pdf,.docx,.doc"
                {...register("resume")}
              />
            </div>
            {/* {errors?.experience?.type == "required" && (
              <p className="text-red-500 ">Resume is required</p>
            )} */}
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleSubmit(onSubmit)}>Apply Job</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
