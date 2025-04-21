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
import { Menu, LogOut, User, LayoutDashboardIcon, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
    { name: "All Rentals", href: "/listings" },
    { name: "About Us", href: "/about" },
    ...(user ? [{ name: "Dashboard", href: `/${user.role}s/dashboard` }] : []),
  ];

  return (
    <header 
      className={`
        sticky top-0 z-20 w-full
        backdrop-blur-md bg-white/80 
        border-b border-gray-100
        transition-all duration-300
        ${scrolled ? "shadow-lg shadow-blue-100/50" : ""}
      `}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <Image 
            src={logo} 
            alt="BasaFinder Logo" 
            width={40} 
            height={32} 
            className="w-8 h-auto sm:w-10 md:w-12 transition-transform group-hover:scale-105" 
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            BasaFinder
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                relative py-1 text-sm lg:text-base font-medium
                transition-colors duration-200
                ${pathname === link.href 
                  ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600 after:rounded-full" 
                  : "text-gray-600 hover:text-blue-600"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full p-0 h-10 w-10 ring-2 ring-gray-100 hover:ring-blue-200 transition-all"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.postimg.cc/QC0n0Jw6/user.jpg" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
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
              <Button 
                className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 hover:bg-blue-50"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[280px] backdrop-blur-lg bg-white/95"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Image src={logo} alt="Logo" width={32} height={32} />
                    <span className="font-bold text-xl">BasaFinder</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col gap-1 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium
                        transition-colors duration-200
                        ${pathname === link.href 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pb-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.postimg.cc/QC0n0Jw6/user.jpg" />
                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => {
                          handleLogOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    </div>
                  ) : (
                    <div className="px-4">
                      <Link href="/login" className="w-full">
                        <Button 
                          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}