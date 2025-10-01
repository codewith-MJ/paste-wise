import { ReactNode } from "react";

type DetailFieldProps = {
  labelName: string;
  children: ReactNode;
};

function DetailField({ labelName, children }: DetailFieldProps) {
  return (
    <div className="mb-6 grid grid-cols-[140px_1fr] items-center px-2">
      <label className="text-base font-medium text-gray-700">{labelName}</label>
      {children}
    </div>
  );
}

export default DetailField;
