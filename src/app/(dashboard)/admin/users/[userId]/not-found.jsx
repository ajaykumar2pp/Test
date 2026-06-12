import Link from "next/link";
import { FileSearch, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
          <FileSearch className="h-12 w-12 text-violet-600" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          User Not Found
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          The user you are looking for does not exist or may have been removed.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
