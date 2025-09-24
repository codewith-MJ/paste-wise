import { ArrowDown } from "lucide-react";

function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
          <ArrowDown className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}

export default Arrow;
