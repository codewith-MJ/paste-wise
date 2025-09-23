import { AiOutlineCheck } from "react-icons/ai";

function FeatureList() {
  return (
    <ul className="space-y-2.5">
      {[
        "Save custom modes for reuse",
        "Set and manage custom shortcuts",
        "Sync history with your mobile app",
      ].map((feature) => (
        <li key={feature} className="flex items-center gap-2.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
            <AiOutlineCheck className="h-2.5 w-2.5 text-blue-600" />
          </span>
          <span className="text-sm font-normal text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
