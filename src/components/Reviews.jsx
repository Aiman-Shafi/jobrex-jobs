import { StarIcon } from "lucide-react";

export default function Reviews() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6" fill="#facc15" />
        </div>
        <p className="text-card-foreground mb-2">
          &#34;I found my first job through FresherJobs. The process was smooth
          and the support was great!&#34;
        </p>
        <p className="text-sm text-muted-foreground">
          - Sarah K., Software Developer
        </p>
      </div>
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6" fill="#facc15" />
        </div>
        <p className="text-card-foreground mb-2">
          &#34;As a recent graduate, FresherJobs helped me land interviews with
          top companies in my field.&#34;
        </p>
        <p className="text-sm text-muted-foreground">
          - Alex M., Marketing Associate
        </p>
      </div>
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6 mr-2" fill="#facc15" />
          <StarIcon className="text-yellow-400 w-6 h-6" fill="#facc15" />
        </div>
        <p className="text-card-foreground mb-2">
          &#34;The resources and job listings on FresherJobs are tailored for
          newcomers. Highly recommended!&#34;
        </p>
        <p className="text-sm text-muted-foreground">
          - Emily R., Data Analyst
        </p>
      </div>
    </div>
  );
}
