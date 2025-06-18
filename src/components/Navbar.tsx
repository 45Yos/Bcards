import { DarkThemeToggle, TextInput } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FcLike } from "react-icons/fc";

type NavbarHeaderProps = {
  onSearch: (value: string) => void;
};

const NavbarHeader = ({ onSearch }: NavbarHeaderProps) => {
  const { isLoggedIn, isBusiness, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col items-center justify-between border-b-2 border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white md:flex-row">
      <div className="flex-1">
        <Link to="/" className="text-xl font-semibold">
          My App
        </Link>
      </div>
      {isAdmin && (
        <span className="font-bold text-red-500">You are an Admin</span>
      )}

      <div className="flex flex-1 justify-center">
        <TextInput
          className="w-80"
          rightIcon={IoSearchSharp}
          placeholder="Search..."
          onChange={(e) => {
            onSearch(e.target.value);
            navigate("/");
          }}
        />
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-4 text-sm md:text-base">
        <DarkThemeToggle />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {!isLoggedIn && (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <button onClick={logout}>Logout</button>
            <Link to="/profile">Profile</Link>

            {isAdmin && <Link to="/crm">CRM</Link>}

            {(isBusiness || isAdmin) && (
              <Link to="/createCard">Create Card</Link>
            )}
            <Link
              to="/likedCards"
              className="inline-flex items-center gap-2 transition-transform hover:scale-110"
            >
              <span>Liked Cards</span>
              <FcLike className="text-xl" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarHeader;
