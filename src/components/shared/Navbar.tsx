"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut,  User,  LayoutDashboardIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to apply shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About-Us", href: "/about" },
    { name: "All-Rentals", href: "/listings" },

    ...(user ? [{ name: "Dashboard", href: `/${user.role}s/dashboard` }] : []),

  ];

  return (
    // <header className={`border-b bg-white w-full sticky top-0 z-20 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
    <header className={`border-b bg-gradient-to-r from-blue-300 to-cyan-200  w-full sticky top-0 z-20 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container flex items-center justify-between mx-auto h-16 px-4 sm:px-5">
        {/* Logo - Responsive sizing */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="BasaFinder Logo" width={40} height={32} className="w-8 h-auto sm:w-10 md:w-12" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold">BasaFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm lg:text-base text-gray-700 hover:text-blue-600 transition ${
                pathname === link.href ? "font-medium text-blue-600" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart with responsive spacing */}
          {/* <Link href="/cart" className="relative ml-1">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center h-9 w-9 p-0 justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {products?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {products.length > 9 ? '9+' : products.length}
                </span>
              )}
            </Button>
          </Link> */}

          {/* User Authentication - Desktop */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-9 w-9">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.postimg.cc/QC0n0Jw6/user.jpg" />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${user.role}s/dashboard`} className="flex w-full cursor-pointer">
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Cart for Mobile */}
          {/* <Link href="/cart" className="relative">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex items-center h-8 w-8 p-0 justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {products?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {products.length > 9 ? '9+' : products.length}
                </span>
              )}
            </Button>
          </Link> */}

          {/* Mobile Menu Hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[300px] bg-gradient-to-r from-blue-300 to-cyan-200">
              {/* Accessibility - Visually Hidden Title */}
              <div className="sr-only">
                <DialogTitle>Mobile Navigation Menu</DialogTitle>
              </div>

              {/* Mobile Menu Header with Close Button */}
              <div className="flex items-center justify-between mb-6 pt-2 ">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Image src={logo} alt="BasaFinder Logo" width={30} height={24} />
                  <span className="text-lg font-bold">BasaFinder</span>
                </Link>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                  {/* <X className="w-5 h-5" /> */}
                </Button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium text-gray-700 hover:text-blue-600 transition ${
                      pathname === link.href ? "text-blue-600" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Cart for Mobile Menu */}
                {/* <Link
                  href="/cart"
                  className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart {products?.length > 0 ? `(${products.length})` : ""}
                </Link> */}

                {/* Divider */}
                <div className="border-t my-2" />

                {/* User Authentication for Mobile */}
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.postimg.cc/QC0n0Jw6/user.jpg" />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name || "User"}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="text-base text-gray-700 hover:text-blue-600 transition flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                    <Link
                      href={`/${user.role}/dashboard`}
                      className="text-base text-gray-700 hover:text-blue-600 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsOpen(false);
                      }}
                      className="text-base text-red-600 hover:text-red-700 flex items-center mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}