"use client";

import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { title: "Products", path: "/products", requiresAuth: true },
    { title: "Add Product", path: "/products/create", requiresAuth: true },
  ];

  const filteredNavigation = navigation.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <nav className="border-b border-gray-200 w-full md:static md:text-sm">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://www.bitechx.com/favicon.png"
              alt="BitechX logo"
              width={32}
              height={32}
              priority
              unoptimized
            />
            <p className="text-xl font-bold">BITECHX</p>
          </Link>
          <div className="md:hidden flex mt-1">
            <button
              className="text-gray-500 hover:text-gray-800 p-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            showMenu ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {filteredNavigation.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <li
                  key={idx}
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-300"
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "block py-2 px-3 rounded-lg transition-colors duration-300",
                      isActive
                        ? "text-hookers-green font-semibold"
                        : "hover:text-white hover:bg-hookers-green"
                    )}
                    onClick={() => setShowMenu(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {filteredNavigation.length > 0 && (
              <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            )}

            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-32">{user?.email}</span>
                  </div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 font-medium text-center text-white bg-hookers-green hover:cursor-pointer rounded-lg shadow md:inline"
                    >
                      Log out
                    </button>
                  </li>
                </div>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block py-3 text-center text-gray-700 hover:text-hookers-green border rounded-lg md:border-none transition-colors duration-300"
                    >
                      Log in
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
