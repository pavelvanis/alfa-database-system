import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Button, CardHeader, Typography } from "@/components/ui";
import Link from "next/link";

const PLACEHOLDER = "Placeholder";

const TesterHeader = () => {
  return (
    <CardHeader
      placeholder={PLACEHOLDER}
      floated={false}
      shadow={false}
      className="rounded-none"
    >
      <div className="mb-2 flex items-center justify-between gap-8">
        <div>
          <Typography placeholder={PLACEHOLDER} variant="h5" color="blue-gray">
            eRecept
          </Typography>
          <Typography
            placeholder={PLACEHOLDER}
            color="gray"
            className="mt-1 font-normal"
          >
            See information about all eRecepts
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link href="/collections">
            <Button placeholder={PLACEHOLDER} variant="outlined" size="sm">
              view collections
            </Button>
          </Link>
          <Button
            placeholder={PLACEHOLDER}
            className="flex items-center gap-3"
            size="sm"
          >
            <DocumentPlusIcon strokeWidth={2} className="h-4 w-4" /> Add eRecept
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default TesterHeader;
