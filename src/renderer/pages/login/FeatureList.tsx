import { Check } from "lucide-react";
function FeatureList() {
  return (
    <ul className="space-y-2.5">
      {[
        "내가 만든 말투를 저장해두고 언제든 꺼내 쓰세요",
        "맞춤 단축키를 설정하고 편하게 관리하세요",
      ].map((feature) => (
        <li key={feature} className="flex items-center gap-2.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
            <Check className="h-2.5 w-2.5 text-blue-600" />
          </span>
          <span className="text-sm font-normal text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
