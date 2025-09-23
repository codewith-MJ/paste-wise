import AppTitle from "./AppTitle";
import LogoutButton from "./LogoutButton";
import UserBadge from "./UserBadge";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <AppTitle />
      <div className="ml-auto flex items-center space-x-4">
        <UserBadge />
        <LogoutButton />
      </div>
    </header>
  );
}

export default Header;
