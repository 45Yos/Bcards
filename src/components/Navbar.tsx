import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, DarkThemeToggle } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useAuth } from "./AuthContext";

type NavbarProps = {
  onSearch: (value: string) => void;
};

export default function Navbar({ onSearch }: NavbarProps) {
  const { isLoggedIn, isBusiness, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col items-center justify-between border-b-2 border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white md:flex-row">
      <div className="flex-1 flex items-center">
        <button
          className="md:hidden ml-4 text-gray-700 dark:text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="text-xl font-semibold ml-4">
          My App
        </Link>
      </div>

      {isAdmin && (
        <span className="font-bold text-red-500 hidden md:block">You are an Admin</span>
      )}

      <div className="flex flex-1 justify-center">
        <TextInput
          className="w-80"
          rightIcon={IoSearchSharp}
          placeholder="Search..."
          onChange={(e) => {
            onSearch(e.target.value);
            navigate("/");
            setIsMenuOpen(false);
          }}
        />
      </div>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col md:flex-row md:flex p-3 flex-wrap items-center justify-end gap-4 text-sm md:text-base md:flex`}
      >
        <DarkThemeToggle />
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              Sign In
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>

            {isAdmin && (
              <Link to="/crm" onClick={() => setIsMenuOpen(false)}>
                CRM
              </Link>
            )}

            {(isBusiness || isAdmin) && (
              <>
                <Link to="/createCard" onClick={() => setIsMenuOpen(false)}>
                  Create Card
                </Link>
                <Link to="/myCards" onClick={() => setIsMenuOpen(false)}>
                  My Cards
                </Link>
              </>
            )}

            <Link
              to="/likedCards"
              className="inline-flex items-center gap-2 transition-transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Liked Cards</span>
              <FcLike className="text-xl" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
