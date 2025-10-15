import { useAuthStore } from "@/renderer/stores/auth";

function UserBadge() {
  const user = useAuthStore((s) => s.user);

  if (!user?.name) return null;

  return (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
      {user.name}님, 안녕하세요!
    </span>
  );
}

export default UserBadge;
