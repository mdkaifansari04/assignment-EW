import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center">
      <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
    </div>
  );
}
